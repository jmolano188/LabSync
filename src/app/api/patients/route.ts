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
   const CreateAt = new Date()
   const fechaNacimiento = new Date(res.Birthdate)
   const agems = CreateAt.getTime() -fechaNacimiento.getTime();
   const dateage = new Date(agems);
   const age = Math.abs(dateage.getUTCFullYear()-1970)
   console.log(res.CreateAt)
   console.log(age)
      const response = await patientService.create({
      TipeId:res.TipeId,
      Identification: res.Identification,
      FirstName: res.FirstName,
      SecondName: res.SecondName,
      FirstLastName: res.FirstLastName,
      SecondLastName: res.SecondLastName,
      Birthdate: res.Birthdate,
      Age :age,
      Phone: res.Phone,
      Email: res.Email,
      Gender: res.Gender,
   })
   return NextResponse.json(response);
}
export async function PUT(req:Request) {
   const res = await req.json()
   const response = await patientService.update(res)
   return NextResponse.json(response);
}



