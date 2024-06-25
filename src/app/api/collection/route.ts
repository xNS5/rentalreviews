import { NextResponse, NextRequest } from 'next/server'
import { getCollection } from '@/app/db/db';

function getResponse(message: string, code: number){
  return NextResponse.json({message: message}, {status: code})
}
 
export async function GET(request: NextRequest) {
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

  const data = await getCollection(collection);
  
  return NextResponse.json({collection: data});
}