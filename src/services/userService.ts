import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class UserService {
    async findByUniquekey(username: string) {
        try {
            return prisma.users.findUnique({
                where: { Username: username },
            });
        } catch (error) {
            console.log("error al obtener todos los el usuario");
        }
    }
    async create(objeto: any) {
        const user = await this.findByUniquekey(objeto.Username)
        if (user) return null;
        return prisma.users.create({ data: objeto })

    }
    async update(objeto: any) {
        const user = await this.findByUniquekey(objeto.Username)
        if (!user) return null;
        return prisma.users.update({
            where: {
                IdUser: user.IdUser,
                Username: user.Username,
            },
            data: {
                Email: objeto.Email,
                Password: objeto.Password
            }
        }
        )
    }

    async delete(username:string){
        const user = await this.findByUniquekey(username)
        if(!user) return null
        return prisma.users.delete({
            where:{Username:username}
        })
    }

}
