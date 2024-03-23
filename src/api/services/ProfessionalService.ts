import {PrismaClient} from "@prisma/client";


export class ProfessionalService {

    constructor(private readonly prisma: PrismaClient) {
    }
    async findAll() {
        try {
            return  this.prisma.professional.findMany();
        }catch (error){
            console.log("error al obtener todos los profesionales")
        }
    }

    findOne(idProfessional: number){
        try {
            return  this.prisma.professional.findUnique({where:{IdProfessional:idProfessional}});
        }catch (error){
            console.log("Error al buscar el profesiona")
        }
    }

   findByIdentification(identification: string = ''){
       try {
           return  this.prisma.professional.findUnique({where:{Identification:identification}});
       }catch (error){
           console.log("error al obtener todos los profesionales")
       }
   }
}
