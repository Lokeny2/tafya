import { getConditionBySlug } from "@/lib/queries";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const condition = await getConditionBySlug(slug);
    if (!condition) return errorResponse("Condition not found", 404);
    return okResponse(condition);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch condition");
  }
}