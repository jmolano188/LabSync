import { proceduresService } from "@/services/proceduresService";
import {NextResponse} from "next/server";



const services = new proceduresService();
export async function GET(request:Request,{params}:{params:{id:string}}) {
    const response = await services.findById((parseInt(params.id)));
    return NextResponse.json(response);
}