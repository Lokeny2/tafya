import { getAllTopics } from "@/lib/queries";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const topics = await getAllTopics(category);
    return okResponse(topics);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch topics");
  }
}