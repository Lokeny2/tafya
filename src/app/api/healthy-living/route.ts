import { connectToDatabase } from "@/lib/mongodb";
import { TopicModel } from "@/lib/models/Topic";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter = category ? { category } : {};
    const topics = await TopicModel.find(filter).sort({ title: 1 }).lean();

    return okResponse(topics);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch topics");
  }
}