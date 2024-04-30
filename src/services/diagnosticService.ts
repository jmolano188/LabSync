import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class DiagnosticService {

    findAll(){
    try {
        return prisma.diagnostics.findMany()
    } catch (error) {
        console.log('Error al buscar el servicio');
    }
    }
}export default DiagnosticService;