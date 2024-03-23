import {PrismaClient, Professional} from "@prisma/client";

export class ProfessionalService {

    constructor(private readonly prisma: PrismaClient) {
    }
     findAll(){
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

   findByIdentification(identification: string){
       try {
           return  this.prisma.professional.findUnique({where:{Identification:identification}});
       }catch (error){
           console.log("error al obtener todos los profesionales")
       }
   }

   async create(objeto: Professional) {
       const profesional = await this.findByIdentification(objeto.Identification);
       if (profesional) return null;
       return  this.prisma.professional.create({data: objeto});
   }

   async update(objeto: Professional) {
       const profesional = await this.findOne(objeto.IdProfessional);
       if(!profesional) return null;
       return this.prisma.professional.create({data:objeto});
   }

   async  delete(idProfesional: number){
       const profesional = await this.findOne(idProfesional);
       if(!profesional) return null;
       this.prisma.professional.delete({where:{IdProfessional:idProfesional}});
   }

}
