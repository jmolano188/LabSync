import { PatientService } from "@/services/patientService";
import {NextResponse} from "next/server";



const patientService = new PatientService();
export async function GET(request:Request,{params}:{params:{identification:string}}) {
    const response = await patientService.findByIdentification((params.identification));
    return NextResponse.json(response);
}