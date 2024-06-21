import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';

function getResponse(message: string, code: number){
  return NextResponse.json({message: message}, {status: code})
}
 
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const collection_regex = new RegExp('[^a-z]')
  const id_regex = new RegExp('[^a-z0-9-]')
  const collection: string | null = searchParams.get("collection");
  const id: string | null = searchParams.get("id");

  if (collection){
    if(collection_regex.test(collection)){
      return getResponse("Invalid collection", 400);
    }
  } else {
    return getResponse("Collection cannot be null", 400);
  }

  if(id){
    if(id_regex.test(id)){
      return getResponse("Invalid Document ID", 400);
    }
  } else {
    return getResponse("Document ID cannot be null", 400);
  }
  
  return NextResponse.json({ msg: {collection: collection} })
}