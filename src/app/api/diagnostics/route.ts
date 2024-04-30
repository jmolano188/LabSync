import {NextResponse} from "next/server";
import { DiagnosticService } from "@/services/diagnosticService";


const diagnosticService = new DiagnosticService();
export async function GET() {
    const response = await diagnosticService.findAll();
    return NextResponse.json(response);
}