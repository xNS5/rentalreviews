import { NextRequest, NextResponse } from "next/server";
import getCompanyData from "@/lib/getCompanyData";

 enum STATUS {
  SUCCESS = 200,
  CLIENT_ERROR = 400,
  SERVER_ERROR = 500,
  NOT_ALLOWED = 403,
}

export function validateID(id: string) {
  const idRegex = new RegExp("[^a-z0-9-]");
  return idRegex.test(id);
}

export function getResponse(message: any, code: STATUS) {
  return NextResponse.json(
    code == STATUS.SUCCESS ? { data: message } : { error: message },
    { status: code }
  );
}

export async function GET(
  req: NextRequest
) {
  const searchParams = req.nextUrl.searchParams;
  const idRegex = new RegExp("[^a-z0-9-]");
  const id: string | null = searchParams.get("id");
  try {
    if (id) {
      if (idRegex.test(id)) {
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
