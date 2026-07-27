import { searchContent } from "@/lib/queries";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() ?? "";
    if (query.length < 2) return okResponse({ conditions: [], topics: [] });
    const results = await searchContent(query);
    return okResponse(results);
  } catch (error) {
    console.error(error);
    return errorResponse("Search failed");
  }
}