import { proceduresService } from "@/services/proceduresService";
import {NextResponse} from "next/server";

const service = new proceduresService();
export async function GET(request:Request,{params}:{params:{identification:string}}) {
    const response = await service.findOne((params.identification));
    return NextResponse.json(response);
}