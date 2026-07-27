import { getAllConditions } from "@/lib/queries";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const conditions = await getAllConditions(category);
    return okResponse(conditions);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch conditions");
  }
}