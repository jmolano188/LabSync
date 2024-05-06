import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class PatientService {
    findAll() {
        try {
            return prisma.patient.findMany({orderBy:{CreateAt:"desc"}});
        } catch (error) {
            console.log('No se pudo encontrar registros de pacientes');

        }
    }
    findOne(idPatient: number) {
        try {
            return prisma.patient.findUnique({
                where: { IdPatient: idPatient }
            })
        } catch (error) {
            console.log('no se pudo encontrar el paciente');
        }
    }   
    findByIdentification(identification: string) {
        try {
            return prisma.patient.findUnique({
                where: { Identification: identification },
            });
        } catch (error) {
            console.log("error al obtener todos los el paciente");
        }
    }
    async searchPagination(page:number=1,pageSize:number=10) {
        const  offset = (page)*pageSize; 
        try {
            const patientPage = await prisma.patient.findMany({skip:offset,take:pageSize,orderBy:{CreateAt:'desc'}});
            console.log(patientPage)
            const patients =  await this.findAll()
            return({patient:patientPage,totalPatients:patients?.length})
        } catch (error) {
            console.log('No se pudo encontrar registros de pacientes');

    }}
    async create(objeto: any) {
        const patient = await this.findByIdentification(objeto.Identification);
        if (patient) return null;
        return prisma.patient.create({ data: objeto});
    }
    
    async update(objeto: any) {
        const patient = await this.findOne(objeto.IdPatient);
        if (!patient) return null;
        return prisma.patient.update({
            where: {
                IdPatient: patient.IdPatient,
                Identification: patient.Identification,
            },
            data: {
                TipeId:objeto.TipeId,
                FirstName: objeto.FirstName,
                SecondName: objeto.SecondName,
                FirstLastName: objeto.FirstLastName,
                SecondLastName: objeto.SecondLastName,
                Birthdate: objeto.Birthdate,
                Phone: objeto.Phone,
                Email: objeto.Email,
                Gender: objeto.Gender, 
                Age: objeto.Age
            },
        });
    }
    async delete(idPatient: number) {
        const patient = await this.findOne(idPatient);
        if (!patient) return null;
        return prisma.patient.delete({
            where: { IdPatient: idPatient },
        });
    }
}