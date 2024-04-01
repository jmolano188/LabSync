import {NextResponse} from "next/server";
import { UserService } from "@/services/userService";


const userService = new UserService();
export async function GET(request:Request,{params}:{params:{username:string}}) {
    const response = await userService.findByUniquekey(params.username);
    return NextResponse.json(response);
}

export async function DELETE (request:Request,{params}:{params:{username:string}}) {
    const response = await userService.delete(params.username)
    return NextResponse.json(response);
}