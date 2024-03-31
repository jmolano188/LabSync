import {NextResponse} from "next/server";
import { proceduresService } from "@/services/proceduresService";

const services = new proceduresService
export async function GET() {
    const response = await services.findAll();
    return NextResponse.json(response)
    
}