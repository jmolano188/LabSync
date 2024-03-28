import { ServiceService } from "@/services/serviceService";
import {NextResponse} from "next/server";



const serviceService = new ServiceService();
export async function GET(request:Request,{params}:{params:{id:string}}) {
    const response = await serviceService.findById((parseInt(params.id)));
    return NextResponse.json(response);
}