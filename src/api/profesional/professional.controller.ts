import {NextResponse} from "next/server";
import {ProfessionalService} from "@/services/professional.service";

let professionalService: ProfessionalService;
export function GET() {
    const response = professionalService.findAll();
    return NextResponse.json(response);
}
