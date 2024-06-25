import { NextResponse, NextRequest} from 'next/server'
import { getDocument } from '@/app/db/db';

function getResponse(message: string, code: number){
  return NextResponse.json({message: message}, {status: code})
}
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const collection_regex = new RegExp('[^a-z]')
  const id_regex = new RegExp('[^a-z0-9-]')
  const collection: string | null = searchParams.get("collection");
  const doc_id: string | null = searchParams.get("doc_id");

  if (collection){
    if(collection_regex.test(collection)){
      return getResponse("Invalid collection", 400);
    }
  } else {
    return getResponse("Collection cannot be null", 400);
  }

  if(doc_id){
    if(id_regex.test(doc_id)){
      return getResponse("Invalid Document ID", 400);
    }
  } else {
    return getResponse("Document ID cannot be null", 400);
  }

  try{
    const data = await getDocument(collection, doc_id);
    return NextResponse.json({document:data});
  }catch(err){
    return getResponse(`Error: ${err}`, 500)
  }

  
}