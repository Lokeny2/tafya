import { connectToDatabase } from "@/lib/mongodb";
import { ConditionModel } from "@/lib/models/Condition";
import { TopicModel } from "@/lib/models/Topic";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return okResponse({ conditions: [], topics: [] });
    }

    // Case-insensitive partial match on title and summary
    const regex = new RegExp(query, "i");

    const [conditions, topics] = await Promise.all([
      ConditionModel.find({
        $or: [{ title: regex }, { summary: regex }],
      })
        .select("slug title summary category")
        .limit(8)
        .lean(),
      TopicModel.find({
        $or: [{ title: regex }, { summary: regex }],
      })
        .select("slug title summary category")
        .limit(4)
        .lean(),
    ]);

    return okResponse({ conditions, topics });
  } catch (error) {
    console.error(error);
    return errorResponse("Search failed");
  }
}