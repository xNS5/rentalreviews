import { NextRequest, NextResponse } from "next/server";
import getCompanyData from "@/lib/getCompanyData";
import { isValidSlug } from "@/lib/utils";

 enum STATUS {
  SUCCESS = 200,
  CLIENT_ERROR = 400,
  SERVER_ERROR = 500,
}

function getResponse(message: any, code: STATUS) {
  return NextResponse.json(
    code == STATUS.SUCCESS ? { data: message } : { error: message },
    { status: code }
  );
}

export async function POST(){
  return getResponse("POST not supported", STATUS.CLIENT_ERROR)
}

export async function GET(
  req: NextRequest
) {
  const searchParams = req.nextUrl.searchParams;
  const id: string | null = searchParams.get("id");
  
  try {
    if (id) {
      if (!isValidSlug(id)) {
        return getResponse("Invalid ID", STATUS.CLIENT_ERROR);
      }
      const data = await getCompanyData(id);
      return getResponse(data, STATUS.SUCCESS);
    } else {
      return getResponse("ID cannot be null", STATUS.CLIENT_ERROR);
    }
  } catch (err) {
    return getResponse(`${err}`, STATUS.SERVER_ERROR);
  }
}
