import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Article from "@/lib/models/Article";
import {
  createArticleSchema,
  updateArticleSchema,
  articleQuerySchema,
} from "@/lib/validations/articleSchema";
import type {
  CreateArticleInput,
  UpdateArticleInput,
  ArticleQueryInput,
} from "@/lib/validations/articleSchema";
import { getCache, setCache, deleteCachePattern } from "@/lib/cache";
import { toPlainObject, toPlainObjects } from "@/lib/utils/mongoose";

const ARTICLES_CACHE_TTL = 60;
const LATEST_CACHE_TTL = 300;

export async function getArticles(query: ArticleQueryInput) {
  await dbConnect();
  const validatedQuery = articleQuerySchema.parse(query);
  const cacheKey = `articles:${JSON.stringify(validatedQuery)}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const { isPublished, page, limit, search, author, fromDate, toDate, category } = validatedQuery;
  const filter: Record<string, unknown> = {};

  if (isPublished !== undefined) filter.isPublished = isPublished;
  if (author) filter.author = author;
  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = new mongoose.Types.ObjectId(category);
  }
  if (fromDate || toDate) {
    const publishedAt: Record<string, unknown> = {};
    if (fromDate) publishedAt.$gte = fromDate;
    if (toDate) publishedAt.$lte = toDate;
    filter.publishedAt = publishedAt;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const [articles, total] = await Promise.all([
    Article.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Article.countDocuments(filter),
  ]);

  const result = {
    data: toPlainObjects(articles),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };

  await setCache(cacheKey, result, ARTICLES_CACHE_TTL);
  return result;
}

// سایر توابع بدون تغییر (همان‌هایی که قبلاً داشتیم با mongoose.Types)
export async function getPublishedArticleBySlug(slug: string) {
  await dbConnect();
  const article = await Article.findOne({ slug, isPublished: true }).lean();
  if (article) {
    void Article.updateOne({ slug }, { $inc: { viewCount: 1 } }).exec();
    return { ...article, _id: String(article._id) };
  }
  return null;
}

export async function getArticleById(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const article = await Article.findById(id).lean();
  return article ? { ...article, _id: String(article._id) } : null;
}

export async function createArticle(data: CreateArticleInput) {
  await dbConnect();
  const validatedData = createArticleSchema.parse(data);
  const categoryId = new mongoose.Types.ObjectId(validatedData.category);
  const existing = await Article.findOne({ slug: validatedData.slug });
  if (existing) throw new Error("Article with this slug already exists");

  const article = await Article.create({
    ...validatedData,
    category: categoryId,
  });
  await deleteCachePattern("articles:*");
  return toPlainObject(article);
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid article ID");
  const validatedData = updateArticleSchema.parse(data);

  if (validatedData.slug) {
    const existing = await Article.findOne({ slug: validatedData.slug, _id: { $ne: id } });
    if (existing) throw new Error("Another article with this slug already exists");
  }

  const updateData: Record<string, unknown> = {};
  if (validatedData.title !== undefined) updateData.title = validatedData.title;
  if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
  if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt;
  if (validatedData.content !== undefined) updateData.content = validatedData.content;
  if (validatedData.image !== undefined) updateData.image = validatedData.image;
  if (validatedData.author !== undefined) updateData.author = validatedData.author;
  if (validatedData.publishedAt !== undefined) updateData.publishedAt = validatedData.publishedAt;
  if (validatedData.isPublished !== undefined) updateData.isPublished = validatedData.isPublished;
  if (validatedData.viewCount !== undefined) updateData.viewCount = validatedData.viewCount;
  if (validatedData.category !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(validatedData.category)) throw new Error("Invalid category ID");
    updateData.category = new mongoose.Types.ObjectId(validatedData.category);
  }

  const article = await Article.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!article) throw new Error("Article not found");
  await deleteCachePattern("articles:*");
  return toPlainObject(article);
}

export async function deleteArticle(id: string) {
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid article ID");
  const article = await Article.findByIdAndDelete(id);
  await deleteCachePattern("articles:*");
  return toPlainObject(article);
}

export async function getLatestArticles(limit = 5) {
  const cacheKey = `latest_articles:${limit}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  await dbConnect();
  const articles = await Article.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select("title slug excerpt publishedAt")
    .lean();

  const result = articles.map((a) => ({
    _id: String(a._id),
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
  }));
  await setCache(cacheKey, result, LATEST_CACHE_TTL);
  return result;
}