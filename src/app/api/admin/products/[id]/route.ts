import { NextRequest } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/services/productService";
import { updateProductSchema } from "@/lib/validations/productSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);
    if (!product) return apiError("Product not found", 404);
    return apiSuccess(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch product";
    return apiError(message, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = updateProductSchema.parse(body);
    const product = await updateProduct(params.id, validated);
    return apiSuccess(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to update product";
    return apiError(message, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await deleteProduct(params.id);
    return apiSuccess({ message: "Product deleted successfully", id: product?._id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete product";
    return apiError(message, 500);
  }
}