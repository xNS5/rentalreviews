import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';

function getResponse(message: string, code: number){
  return NextResponse.json({message: message}, {status: code})
}
 
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  const collection_regex = new RegExp('[^a-z]')
  const collection: string | null = searchParams.get("collection");

  if (collection){
    if(collection_regex.test(collection)){
      return getResponse("Invalid collection", 400);
    }
  } else {
    return getResponse("Collection cannot be null", 400);
  }
  
  return NextResponse.json({ msg: {collection: collection} })
}