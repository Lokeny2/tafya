import { connectToDatabase } from "@/lib/mongodb";
import { TopicModel } from "@/lib/models/Topic";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const topic = await TopicModel.findOne({ slug }).lean();

    if (!topic) {
      return errorResponse("Topic not found", 404);
    }

    return okResponse(topic);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch topic");
  }
}