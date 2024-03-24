import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export class PatientService {
    findAll() {
        try {
            return prisma.patient.findMany();
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
    async create(objeto: any) {
        const patient = await this.findByIdentification(objeto.Identification);
        if (patient) return null;
        return prisma.patient.create({ data: objeto});
    }
    async update(objeto: any) {
        const patient = await this.findOne(objeto.IdPatient);
        console.log(objeto.IdPatient);
        if (!patient) return null;
        return prisma.patient.update({
            where: {
                IdPatient: patient.IdPatient,
                Identification: patient.Identification,
            },
            data: {
                FirstName: objeto.FirstName,
                SecondName: objeto.SecondName,
                FirstLastName: objeto.FirstLastName,
                SecondLastName: objeto.SecondLastName,
                Birthdate: objeto.Birthdate,
                Phone: objeto.Phone,
                Email: objeto.Email,
                Gender: objeto.gender, 
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