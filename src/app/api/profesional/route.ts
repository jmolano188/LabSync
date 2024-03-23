import {NextResponse} from "next/server";
import {ProfessionalService} from "@/services/professionalService";


const professionalService = new ProfessionalService();
export async function GET() {
    const response = await professionalService.findAll();
    return NextResponse.json(response);
}

export async function POST(req:Request) {
   const res = await req.json()
   const response = await professionalService.create(res)
   return NextResponse.json(response);
}
export async function PUT(req:Request) {
   const res = await req.json()
   const response = await professionalService.update(res)
   return NextResponse.json(response);
}



