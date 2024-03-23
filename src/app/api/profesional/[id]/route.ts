import {NextResponse} from "next/server";
import {ProfessionalService} from "@/services/professionalService";
import { request } from "http";


const professionalService = new ProfessionalService();
export async function GET(request:Request,{params}:{params:{id:string}}) {
    const response = await professionalService.findOne(parseInt(params.id));
    return NextResponse.json(response);
}

export async function DELETE (request:Request,{params}:{params:{id:string}}) {
    const response = await professionalService.delete(parseInt(params.id))
    return NextResponse.json(response);
}