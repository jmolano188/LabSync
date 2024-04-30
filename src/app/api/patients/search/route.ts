import {NextResponse} from "next/server";
import { PatientService } from "@/services/patientService";
const patientService = new PatientService();

export async function POST(req:Request) {
    const res = await req.json()
    console.log(res);
    const page =res.page
    const pageSize = res.pageSize
    const response	= await patientService.searchPagination(page,pageSize)
    return NextResponse.json(response);
}
