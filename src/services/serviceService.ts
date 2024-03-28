import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class ServiceService {

    findAll(){
    try {
        return prisma.services.findMany()
    } catch (error) {
        console.log('Error al buscar el servicio');
        
    }
    }
    findOne(codeservice: string) {
        try {
            return prisma.services.findUnique({
                where: {CodeService: codeservice },
            });
        } catch (error) {
            console.log("Error al buscar el servicio");
        }
    }
    findById(idservice: number) {
        try {
            return prisma.services.findUnique({
                where: {IdServices: idservice },
            });
        } catch (error) {
            console.log("Error al buscar el servicio");
        }
    }
}
