import { NextRequest } from "next/server";
import { createProduct } from "@/lib/services/productService";
import { createProductSchema } from "@/lib/validations/productSchema";
import { apiSuccess, apiError, apiValidationError } from "@/lib/utils/apiResponse";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createProductSchema.parse(body);
    const product = await createProduct(validated);
    return apiSuccess(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error.flatten().fieldErrors);
    }
    const message = error instanceof Error ? error.message : "Failed to create product";
    return apiError(message, 500);
  }
}