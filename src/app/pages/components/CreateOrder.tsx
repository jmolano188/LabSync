'use client'
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { tipoId,genero } from "../../../../public/list";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

async function loadProfesional(){
        const res = await fetch('/api/profesional');
        const response = await res.json();
        console.log(response)
        return response;
}
async function loadDiagnostic(){
    const res = await fetch('/api/diagnostics');
    const response = await res.json();
    console.log(response)
    return response;
}


function CreateOrder(props:any){
    const {handleSubmit, register} = useForm()
    const [patient, setPatient] = useState(props.patient || {})
    const [profesional, setProfesional] =useState<Array<any>>([])
    const [diagnostic, setDiagnostics] =useState<Array<any>>([])
    async function onSubmit (value:any){
            const res = await fetch('/api/patients',{
            method: 'POST',
            body: JSON.stringify({
                IdPatient:patient.IdPatient,
                Identification: value.IdDiagnostic,
                TipeId: value.TipeId,
                }),
            headers:{
                'content-type': 'aplication/json'
            }})      
    }
    useEffect(() => {
        const fetchData = async () => {
        const res = await loadProfesional();
        setProfesional(res);
        };
    fetchData();
    },[]);
    useEffect(() => {
        const fetchDataDiagnostic = async () => {
        const res = await loadDiagnostic();
        setDiagnostics(res);
        };
        fetchDataDiagnostic();
    },[]);
    return(
        <div className="flex-wrap" style={{marginTop:"20px",marginLeft:"20px", marginRight:"20px",border:"2px solid black "}} >
            <form action="">
            <div  className="flex">
                <FormControl isReadOnly mr={5}>
                    <FormLabel htmlFor="nombre" >Nombre</FormLabel>
                    <Input id="nombre" defaultValue={`${patient.FirstName} ${patient.SecondName}  ${patient.FirstLastName} ${patient.SecondLastName} ` || ''}/>
                </FormControl>
                <FormControl isReadOnly mr={5}>
                    <FormLabel  >Tipo Id</FormLabel>
                    <Input  defaultValue={patient.TipeId || ''}/>
                </FormControl>
                <FormControl isReadOnly mr={5}>
                    <FormLabel  >Identificación</FormLabel>
                    <Input  defaultValue={patient.Identification || ''}/>
                </FormControl>
            </div>
            <div className="flex">
                <FormControl isReadOnly mr={5}>
                    <FormLabel  >Sexo</FormLabel>
                    <Input  defaultValue={patient.Gender || ''}/>
                </FormControl>
                <FormControl isReadOnly mr={5}>
                    <FormLabel  >Edad</FormLabel>
                    <Input  defaultValue={patient.Age || ''}/>
                </FormControl>
                <FormControl isReadOnly mr={5}>
                    <FormLabel htmlFor="Birthdate">Fecha Nacimiento</FormLabel>
                    <Input id="Birthdate" defaultValue={patient.Birthdate ? patient.Birthdate.substring(0,10) || '':''} type="date" />
                </FormControl>
                <FormControl isReadOnly mr={5}>
                    <FormLabel  >Estado</FormLabel>
                    <Input  defaultValue={'Activa'}/>
                </FormControl>
            </div>
            <div className="flex">
                <FormControl mr={5}>
                    <FormLabel  >Diagnostico</FormLabel>
                    <Select  placeholder="Seleccione" {...register("IdDiagnostic")} >
                    { diagnostic.map((option,IdDiagnostic)=>(
                    <option key ={IdDiagnostic} value={option.value}>
                    {option.CodeDiagnostic}
                    {option.NameDiagnostic}
                    </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl mr={5}>
                    <FormLabel  >Médico</FormLabel>
                    <Select  placeholder="Seleccione" {...register("IdProfessional")} >
                    { profesional.map((option,IdProfessional)=>(
                    <option key ={IdProfessional} value={option.value}>
                    {option.Name}
                    </option>
                    ))}
                    </Select>
                </FormControl>
                <div className="flex gap-3 mt-96 justify-end">
                    <Button type="submit" colorScheme="green" >
                    <CheckIcon/>Guardar
                    </Button>
                    <Button  mr={5} colorScheme="red" >
                    <CloseIcon/> Salir
                    </Button>
                </div>
            </div>
            </form> 
        </div>
    )
} export default CreateOrder;