import {NextResponse} from "next/server";
import { UserService } from "@/services/userService";
import bcrypt from 'bcrypt'


const userService = new UserService();
export async function POST(req:Request) {
    const res = await req.json();
    const hashedpassword = await bcrypt.hash(res.Password,10);
    res.Password = hashedpassword;
    const response = await userService.create(res);
    if (response){ 
        delete response.Password;
        return NextResponse.json(response);}
        else {
                return NextResponse.json({
                    message:"El usuario ya existe"
                },{
                    status:400
                })
        }
}

export async function PUT(req:Request) {
    const res = await req.json();
    const hashedpassword = await bcrypt.hash(res.Password,10);
    res.Password = hashedpassword;
    const response = await userService.update(res);
    if (response) delete response.Password;
    return NextResponse.json(response);
}