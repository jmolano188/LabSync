import {NextResponse} from "next/server";
import {ProfessionalService} from "@/services/professionalService";
import { request } from "http";


const professionalService = new ProfessionalService();
export async function GET(request:Request,{params}:{params:{identification:string}}) {
    const response = await professionalService.findByIdentification((params.identification));
    return NextResponse.json(response);
}