import {ServiceService } from "@/services/serviceService";
import {NextResponse} from "next/server";



const serviceService = new ServiceService();
export async function GET(request:Request,{params}:{params:{CodeService:string}}) {
    const response = await serviceService.findOne((params.CodeService));
    return NextResponse.json(response);
}