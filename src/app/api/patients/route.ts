import {NextResponse} from "next/server";
import { PatientService } from "@/services/patientService";


const patientService = new PatientService();
export async function GET() {
    const response = await patientService.findAll();
    return NextResponse.json(response);
}

export async function POST(req:Request) {
   const res = await req.json()
   console.log(res);
   const response = await patientService.create(res)
   return NextResponse.json(response);
}
export async function PUT(req:Request) {
   const res = await req.json()
   const response = await patientService.update(res)
   return NextResponse.json(response);
}



