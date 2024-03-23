import {PrismaClient, Professional} from "@prisma/client";

const prisma = new PrismaClient;

export class ProfessionalService {


     findAll(){
        try {
            return  prisma.professional.findMany();
        }catch (error){
            console.log("error al obtener todos los profesionales")
        }
    }

    findOne(idProfessional: number){
        try {
            return  prisma.professional.findUnique({where:{IdProfessional:idProfessional}});
        }catch (error){
            console.log("Error al buscar el profesiona")
        }
    }

   findByIdentification(identification: string){
       try {
           return  prisma.professional.findUnique({where:{Identification:identification}});
       }catch (error){
           console.log("error al obtener todos los profesionales")
       }
   }

   async create(objeto: any) {
       const profesional = await this.findByIdentification(objeto.Identification);
       if (profesional) return null;
       return  prisma.professional.create({data:objeto});
   }

   async update(objeto:any) {
       const profesional = await this.findOne(objeto.IdProfessional);
       console.log(objeto.IdProfessional)
       if(!profesional) return null;
       return prisma.professional.update({where:{IdProfessional:profesional.IdProfessional,
        Identification:profesional.Identification},
        data:
        {
        Name:objeto.Name,
        Register:objeto.Register,
        Identification:objeto.Identification,
        specialty:objeto.specialty,}});
   }

   async  delete(idProfesional: number){
       const profesional = await this.findOne(idProfesional);
       if(!profesional) return null;
       return prisma.professional.delete({where:{IdProfessional:idProfesional}});
   }
}
