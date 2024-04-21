'use client'
import {  CheckIcon, CloseIcon, RepeatClockIcon } from "@chakra-ui/icons"
import { Button, FormControl, FormLabel, Input, Select, } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import {useState} from 'react'

const tipoId =[
    {value: "AS", label: "ADULTO SIN IDENTIFICACION"}, 
    {value: "CC", label: "CEDULA DE CIUDADANIA"}, 
    {value: "CD", label: "CARNET DIPLOMATICO"},
    {value: "CE", label: "CEDULA DE EXTANJERIA"},
    {value: "CN", label: "CERTIFICADO DE NACIDO VIVO"}, 
    {value: "DE", label: "DOCUMENTO EXTERANJERO"}, 
    {value: "MS", label: "MENOR SIN IDENTIFICACION"}, 
    {value: "NI", label: "NÚIMERO DE IDENTIFICACION TRIBUTARIO NIT"}, 
    {value: "NV", label: "CERTIFICADO NACIDO VIVO"},
    {value: "PA", label: "PASAPORTE "},
    {value: "PE", label: "PERMISO ESPECIAL DE PERMANENCIA"}, 
    {value: "PT", label: "PERMIO POR PROTECCION TEMPORAL"},
    {value: "RC", label: "REGISTRO CIVIL"},
    {value: "SC", label: "SALVOCONDUCTO"},
    {value: "SI", label: "SIN IDENTIFICACION"}, 
    {value: "TI", label: "TARJETA IDENTIDAD"}]
const genero =[
        {value: "F", label: "FEMENINO"}, 
        {value: "M", label: "MASCULINO"}, 
        {value: "I", label: "INDETERMINADO O INTERSEXUAL"}]

function CreatePatient (){

const [inputAge, setInputAge] = useState("")

const {handleSubmit, register, reset} = useForm() 
async function onSubmit (value:any){
    const fechaNacimiento = new Date(value.Birthdate).toISOString()
    value.Birthdate = fechaNacimiento
        const res = await fetch('/api/patients',{
            method: 'POST',
            body: JSON.stringify({
                Identification: value.Identification,
                TipeId: value.TipeId,
                FirstName: value.FirstName,
                SecondName:value.SecondName,
                FirstLastName:value.FirstLastName,
                SecondLastName: value.SecondLastName,
                Birthdate: value.Birthdate,
                Gender: value.Gender,
                Phone: value.Phone,
                Email: value.Email
                }),
            headers:{
                'content-type': 'aplication/json'
            }})
    const response = await res.json()
    setInputAge(response.Age)
}
const handleClearForm = ()=>{
    reset()
}
return(
<div className="h-[calc(100vh-7rem)]">
<form onSubmit={handleSubmit(onSubmit)}>
<div className="flex mt-10">
    <FormControl isRequired mr={5} ml={5}>
    <FormLabel htmlFor="Identification" >Identificación</FormLabel>
    <Input id="Identification" placeholder='Identificaión' type="number"
    {...register("Identification")}/>
    </FormControl>
    <FormControl isRequired mr={5}>
    <FormLabel htmlFor="TipeId" >Tipo ID </FormLabel>
    <Select id="TipeId" placeholder="Seleccione" {...register("TipeId")} >
        {tipoId.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired mr={5} >
        <FormLabel  htmlFor="FirstName" >Primer Nombre</FormLabel>
        <Input  id="FirstName" placeholder='Primer Nombre' {...register("FirstName")} />
    </FormControl>
    <FormControl mr={5} >
        <FormLabel htmlFor="SecondName">Segundo Nombre</FormLabel>
        <Input id="SecondName" placeholder='Segundo Nombre' {...register("SecondName")} />
    </FormControl>
    </div>
    <div className="flex mt-10">
    <FormControl isRequired mr={5} ml={5} >
        <FormLabel  htmlFor="FirstLastName">Primer Apellido</FormLabel>
        <Input id="FirstLastName" placeholder='Primer Apellido' {...register("FirstLastName")} />
    </FormControl>
    <FormControl  mr={5}>
        <FormLabel htmlFor="SecondLastName" >Segundo Apellido</FormLabel>
        <Input id="SecondLastName" placeholder='Segundo Apellido' {...register("SecondLastName")} />
    </FormControl>
    <FormControl  isRequired mr={5}>
        <FormLabel htmlFor="Birthdate">Fecha Nacimiento</FormLabel>
        <Input id="Birthdate" type= "date" placeholder='Fecha Nacimiento' {...register("Birthdate")} />
    </FormControl>
    <FormControl  isReadOnly mr={5}>
        <FormLabel htmlFor="Age">Edad</FormLabel>
        <Input value={inputAge} id="Age" {...register("Age")} />
    </FormControl>  
    </div>
    <div className="flex mt-10">
    <FormControl isRequired mr={5} ml={5}>
    <FormLabel htmlFor="Gender"> Sexo </FormLabel>
    <Select id="Gender" placeholder="Seleccione" {...register("Gender")}  >
        {genero.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired mr={5}  >
        <FormLabel htmlFor="Phone">Celular</FormLabel>
        <Input id="Phone" type="number" maxLength={10} placeholder='Celular' {...register("Phone")} />
    </FormControl>
    <FormControl isRequired mr={5}>
        <FormLabel htmlFor="Email">Correo</FormLabel>
        <Input id="Email" type="mail" placeholder='Correo eléctronico' {...register("Email")} />
    </FormControl>
    </div>
    <div className="flex gap-3 mt-96 justify-end">
    <Button type="submit" colorScheme="green" >
    <CheckIcon/>Guardar
    </Button>
    <Button onClick={handleClearForm} colorScheme="yellow" >
    <RepeatClockIcon/> Cancelar
    </Button>
    <Button mr={5} colorScheme="red" >
    <CloseIcon/> Salir
    </Button>
    </div>
</form>
</div>
)}
export default CreatePatient