'use client'
import {  CheckIcon, CloseIcon, EditIcon, RepeatClockIcon } from "@chakra-ui/icons"
import { Button, FormControl, FormLabel, Input, Modal, ModalBody,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import {useState} from 'react'
import { tipoId,genero } from "../../../../public/list";
function CreatePatient (props:any){


    const [inputAge, setInputAge] = useState("")
    const [creando,setCreando] = useState(props.crear)
    const [editando,setEditando] = useState(props.editar)
    const [creado, setCreado] = useState(props.creado)
    const [editarTabla, setEditarTabla] = useState(props.editarTabla)
    const [cancelar, setCancelar] = useState(false)
    const [salir, setSalir] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {handleSubmit, register} = useForm() 
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
    setCreando(false)
    setCreado(true)
    }
    const handleOutForm = ()=>{
        setCreado(false)
        setEditando(false)
        setCancelar(true)
        onOpen()
    }
    const handleEditForm =()=>{
            setEditando(true)
            setCreado(false)
    }
    const handleExitForm =()=>{
        setCancelar(false)
        onOpen()
    }
    const handleExitModal =()=>{
        if (cancelar && !editarTabla){
            setCreado(true)
            setEditando(false)
            setCancelar(false)
            onClose()
        }else{
            setSalir(true)
            props.salir(true)
        }
    }
    const handleExit=()=>{
        if(cancelar){
            setEditando(true)
            setCreado(false)
            onClose()
        }else{
            setEditando(false)
            creando? setCreado(false):setCreado(true)
            setCancelar(false)
            onClose()
        }
    }
return(
<div className="flex-wrap">
<form onSubmit={handleSubmit(onSubmit)}>
<div className="flex mt-10">
    <FormControl isRequired isDisabled={creado || editando} mr={5} ml={5}>
    <FormLabel htmlFor="Identification" >Identificación</FormLabel>
    <Input id="Identification" placeholder='Identificaión' type="number"
    {...register("Identification")}/>
    </FormControl>
    <FormControl isRequired isDisabled={creado} mr={5}>
    <FormLabel htmlFor="TipeId" >Tipo ID </FormLabel>
    <Select id="TipeId" placeholder="Seleccione" {...register("TipeId")} >
        {tipoId.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired isDisabled={creado} mr={5} >
        <FormLabel  htmlFor="FirstName" >Primer Nombre</FormLabel>
        <Input  id="FirstName" placeholder='Primer Nombre' {...register("FirstName")} />
    </FormControl>
    <FormControl mr={5}  isDisabled={creado}>
        <FormLabel htmlFor="SecondName">Segundo Nombre</FormLabel>
        <Input id="SecondName" placeholder='Segundo Nombre' {...register("SecondName")} />
    </FormControl>
    </div>
    <div className="flex mt-10">
    <FormControl isRequired isDisabled={creado} mr={5} ml={5} >
        <FormLabel  htmlFor="FirstLastName">Primer Apellido</FormLabel>
        <Input id="FirstLastName" placeholder='Primer Apellido' {...register("FirstLastName")} />
    </FormControl>
    <FormControl isDisabled={creado}  mr={5} >
        <FormLabel htmlFor="SecondLastName" >Segundo Apellido</FormLabel>
        <Input id="SecondLastName" placeholder='Segundo Apellido' {...register("SecondLastName")} />
    </FormControl>
    <FormControl  isRequired isDisabled={creado} mr={5}>
        <FormLabel htmlFor="Birthdate">Fecha Nacimiento</FormLabel>
        <Input id="Birthdate" type= "date" placeholder='Fecha Nacimiento' {...register("Birthdate")} />
    </FormControl>
    <FormControl  isReadOnly isDisabled={creado} mr={5}>
        <FormLabel htmlFor="Age">Edad</FormLabel>
        <Input value={inputAge} id="Age" {...register("Age")} />
    </FormControl>  
    </div>
    <div className="flex mt-10">
    <FormControl isRequired isDisabled={creado} mr={5} ml={5}>
    <FormLabel htmlFor="Gender"> Sexo </FormLabel>
    <Select id="Gender" placeholder="Seleccione" {...register("Gender")}  >
        {genero.map((option,index)=>(
            <option key ={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </Select>
    </FormControl>
    <FormControl isRequired isDisabled={creado} mr={5}   >
        <FormLabel htmlFor="Phone">Celular</FormLabel>
        <Input id="Phone" type="number" maxLength={10} placeholder='Celular' {...register("Phone")} />
    </FormControl>
    <FormControl isRequired isDisabled={creado} mr={5}>
        <FormLabel htmlFor="Email">Correo</FormLabel>
        <Input id="Email" type="mail" placeholder='Correo eléctronico' {...register("Email")} />
    </FormControl>
    </div>
    <div className="flex gap-3 mt-96 justify-end">
    {(creando || editando || cancelar)  && <Button type="submit" colorScheme="green" >
    <CheckIcon/>Guardar
    </Button>}
    {creado && <Button colorScheme="blue" onClick={handleEditForm} >
    <EditIcon/> Editar
    </Button>}
    {(cancelar ||editando) && <Button onClick={handleOutForm} colorScheme="yellow" mr={5}>
    <RepeatClockIcon/> Cancelar
    </Button>}
    {(creando || creado) && <Button onClick={handleExitForm} mr={5} colorScheme="red" >
    <CloseIcon/> Salir
    </Button>}
    </div>
</form>
{<div>
<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size={"lg"} >
<ModalOverlay />
        <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {
            cancelar&& <h1 style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Desea deshacer los cambios sin guardar?
            </h1>}
            {!cancelar&&<h1 style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Desea salir sin guardar los cambios?
            </h1>
            }               
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleExitModal}>
            Si
            </Button>
            <Button colorScheme="red" onClick={handleExit}>No</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
</div>}
</div>
)}
export default CreatePatient