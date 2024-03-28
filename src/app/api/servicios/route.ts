import {NextResponse} from "next/server";
import { ServiceService } from "@/services/serviceService";

const serviceService = new ServiceService
export async function GET() {
    const response = await serviceService.findAll();
    return NextResponse.json(response)
    
}