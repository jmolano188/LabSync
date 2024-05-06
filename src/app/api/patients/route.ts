import {NextResponse} from "next/server";
import { PatientService } from "@/services/patientService";


const patientService = new PatientService();
export async function GET() {
    const response = await patientService.findAll();
    return NextResponse.json(response);
}
function age(birthdate:string){
   const CreateAt = new Date()
   const fechaNacimiento = new Date(birthdate)
   const agems = CreateAt.getTime() - fechaNacimiento.getTime();
   const dateage = new Date(agems);
   return Math.abs(dateage.getUTCFullYear()-1970)
}

export async function POST(req:Request) {
   const res = await req.json()
   console.log(res);
      const newAge = age(res.Birthdate)
      const response = await patientService.create({
      TipeId:res.TipeId,
      Identification: res.Identification,
      FirstName: res.FirstName.toUpperCase(),
      SecondName: res.SecondName.toUpperCase(),
      FirstLastName: res.FirstLastName.toUpperCase(),
      SecondLastName: res.SecondLastName.toUpperCase(),
      Birthdate: res.Birthdate,
      Age :newAge,
      Phone: res.Phone,
      Email: res.Email.toUpperCase(),
      Gender: res.Gender,
   })
   return NextResponse.json(response);
}
export async function PUT(req:Request) {
   const res = await req.json()
   const newAge = age(res.Birthdate)
   const response = await patientService.update({
      IdPatient:res.IdPatient,
      TipeId:res.TipeId,
      FirstName: res.FirstName.toUpperCase(),
      SecondName: res.SecondName.toUpperCase(),
      FirstLastName: res.FirstLastName.toUpperCase(),
      SecondLastName: res.SecondLastName.toUpperCase(),
      Birthdate: res.Birthdate,
      Age :newAge,
      Phone: res.Phone,
      Email: res.Email.toUpperCase(),
      Gender: res.Gender
   })
   return NextResponse.json(response);
}



