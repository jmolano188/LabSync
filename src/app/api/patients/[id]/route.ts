import {NextResponse} from "next/server";
import { PatientService } from "@/services/patientService";


const patientService = new PatientService();
export async function GET(request:Request,{params}:{params:{id:string}}) {
    const response = await patientService.findOne(parseInt(params.id));
    return NextResponse.json(response);
}

export async function DELETE (request:Request,{params}:{params:{id:string}}) {
    const response = await patientService.delete(parseInt(params.id))
    return NextResponse.json(response);
}