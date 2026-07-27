import { getTopicBySlug } from "@/lib/queries";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const topic = await getTopicBySlug(slug);
    if (!topic) return errorResponse("Topic not found", 404);
    return okResponse(topic);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch topic");
  }
}