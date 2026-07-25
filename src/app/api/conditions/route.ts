import { connectToDatabase } from "@/lib/mongodb";
import { ConditionModel } from "@/lib/models/Condition";
import { okResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter = category ? { category } : {};
    const conditions = await ConditionModel.find(filter).sort({ title: 1 }).lean();

    return okResponse(conditions);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch conditions");
  }
}