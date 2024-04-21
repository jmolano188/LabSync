'use client'
import {  CheckIcon, CloseIcon, RepeatClockIcon } from "@chakra-ui/icons"
import { Button, FormControl, FormLabel, Input, Select, } from "@chakra-ui/react"

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
return(
<div>
<form action="">
<div className="flex mt-10">
    <FormControl mr={5} ml={5}>
        <FormLabel >Identificación</FormLabel>
        <Input  placeholder='Identificaión' type="number" />
    </FormControl>
    <FormControl isRequired mr={5}>
    <FormLabel >Tipo ID </FormLabel>
    <Select placeholder="Seleccione"  >
        {tipoId.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired mr={5} >
        <FormLabel>Primer Nombre</FormLabel>
        <Input placeholder='Primer Nombre' />
    </FormControl>
    <FormControl mr={5} >
        <FormLabel>Segundo Nombre</FormLabel>
        <Input placeholder='Segundo Nombre' />
    </FormControl>
    </div>
    <div className="flex mt-10">
    <FormControl isRequired mr={5} ml={5} >
        <FormLabel>Primer Apellido</FormLabel>
        <Input placeholder='Primer Apellido' />
    </FormControl>
    <FormControl  mr={5}>
        <FormLabel>Segundo Apellido</FormLabel>
        <Input placeholder='Segundo Apellido' />
    </FormControl>
    <FormControl  isRequired mr={5}>
        <FormLabel>Fecha Nacimiento</FormLabel>
        <Input type= "date" placeholder='Fecha Nacimiento' />
    </FormControl>
    <FormControl  isReadOnly mr={5}>
        <FormLabel>Edad</FormLabel>
        <Input />
    </FormControl>  
    </div>
    <div className="flex mt-10">
    <FormControl isRequired mr={5} ml={5}>
    <FormLabel > Sexo </FormLabel>
    <Select placeholder="Seleccione"  >
        {genero.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired mr={5}  >
        <FormLabel>Celular</FormLabel>
        <Input type="number" maxLength={10} placeholder='Celular' />
    </FormControl>
    <FormControl  mr={5}>
        <FormLabel>Correo</FormLabel>
        <Input type="mail" placeholder='Correo eléctronico' />
    </FormControl>
    </div>
    <div className="flex gap-3">
    <Button  colorScheme="green" >
    <CheckIcon/>Guardar
    </Button>
    <Button colorScheme="yellow" >
    <RepeatClockIcon/> Cancelar
    </Button>
    <Button colorScheme="red" >
    <CloseIcon/> Salir
    </Button>
    </div>
</form>
</div>

)}
export default CreatePatient