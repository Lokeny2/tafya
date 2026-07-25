import { connectToDatabase } from "@/lib/mongodb";
import { ConditionModel } from "@/lib/models/Condition";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const condition = await ConditionModel.findOne({ slug }).lean();

    if (!condition) {
      return errorResponse("Condition not found", 404);
    }

    return okResponse(condition);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch condition");
  }
}