'use client'
import { useForm } from "react-hook-form";
import {useEffect, useState} from 'react'
import { tipoId,genero } from "../../../../public/list";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Input, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField } from "@mui/material";
import { CancelPresentationRounded, Edit, Save, Undo } from "@mui/icons-material";

function CreatePatient (props:any){
    const [inputAge, setInputAge] = useState("")
    const [creando,setCreando] = useState(props.crear)
    const [editando,setEditando] = useState(props.editar)
    const [creado, setCreado] = useState(props.creado)
    const [editarTabla, setEditarTabla] = useState(props.editarTabla)
    const [cancelar, setCancelar] = useState(false)
    const [salir, setSalir] = useState(false)
    const [patient, setPatient] = useState(props.patient || {})
    const [open, setOpen] = useState(false)
    const [identificacion, setIdentificacion] = useState(patient.Identification || '')
    const [phone, setPhone] = useState(patient.Phone || '')
    const {handleSubmit, register} = useForm()
   
        async function onSubmit (value:any){
        const fechaNacimiento = new Date(value.Birthdate).toISOString()
        value.Birthdate = fechaNacimiento
        if(patient.IdPatient){
        const res = await fetch('/api/patients',{
            method: 'PUT',
            body: JSON.stringify({
                IdPatient:patient.IdPatient,
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
            setPatient(response)
            setCreando(false)
            setEditando(false)
            setCreado(true)
            setCancelar(false)
        }else{
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
        console.log(res)
    const response = await res.json()
    setPatient(response)
    setCreando(false)
    setCreado(true)
        }}
    const handleOutForm = ()=>{
        setCreado(false)
        setEditando(false)
        setCancelar(true)
        setOpen(true)
    }
    const handleEditForm =()=>{
        setEditando(true)
        setCreado(false)
    }
    const handleExitForm =()=>{
        setCancelar(false)
        setOpen(true)
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
    const onClose =()=>setOpen(false)
    const handledIdentificacion = (event:any) =>{
        const valorIngresado = event.target.value
        if(valorIngresado.length <= 10){
            setIdentificacion(valorIngresado)
        }
    }
    const handledPhone = (event:any) =>{
        const valorIngresado = event.target.value
        if(valorIngresado.length <= 10){
            setPhone(valorIngresado)
        }
    }
return(
<div className="flex-wrap" style={{justifyContent: "space-around"}} >
<form onSubmit={handleSubmit(onSubmit)}>
<div style={{ display: "flex", marginTop: "60px", justifyContent: "space-around" }}>
    <TextField required disabled={creado || editando} label="Identificación"  id="Identification" defaultValue={patient.Identification || ''} value={identificacion}
    placeholder='Identificación' type="number" style={{width:"215px"}}
    {...register("Identification")} onChange={handledIdentificacion} inputProps={{inputMode:"numeric", pattern:"[0-9]*"}}/>
    <FormControl>
    <InputLabel id="TipeId">Tipo Id</InputLabel>
    <Select required disabled={creado} label="Tipo Id" id="TipeId" style={{width:"215px"}} defaultValue={patient.TipeId || 'CC'} 
     placeholder="Seleccione" {...register("TipeId")} input={<OutlinedInput label="Tipo Id"/>}>
        { tipoId.map((option,index)=>(
            <MenuItem key ={index} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
            </Select>
    </FormControl>
    <TextField label="Primer Nombre" required disabled={creado} id="FirstName" defaultValue={patient.FirstName || ''} placeholder='Primer Nombre' {...register("FirstName")} inputProps={{maxLength:20}}/>
    <TextField label="Segundo Nombre" disabled={creado} id="SecondName" defaultValue={patient.SecondName || ''} placeholder='Segundo Nombre' {...register("SecondName")} style={{width:"215px"}} inputProps={{maxLength:20}}/>
    </div>

    <div style={{ display: "flex", marginTop: "20px", justifyContent: "space-around" }}>
    <TextField label="Primer Apellido" required disabled={creado} id="FirstLastName" defaultValue={patient.FirstLastName || ''}  placeholder='Primer Apellido' {...register("FirstLastName")} style={{width:"215px"}} inputProps={{maxLength:30}}/>
    <TextField label="Segundo Apellido" disabled={creado} id="SecondLastName" defaultValue={patient.SecondLastName || ''} placeholder='Segundo Apellido' {...register("SecondLastName")} style={{width:"215px"}} inputProps={{maxLength:30}}/>

        <TextField label="Fecha de Nacimiento" required disabled={creado} id="Birthdate" defaultValue={patient.Birthdate ? patient.Birthdate.substring(0,10) || '':''} type= "date" placeholder=''
        style={{width:"215px"}} {...register("Birthdate")} />
        <TextField label="Edad" disabled value={patient.Age || ''} id="Age" {...register("Age")} style={{width:"215px"}}/>
    </div>
    <div style={{ display: "flex", marginTop: "20px",justifyContent: "space-around" }}>
    <FormControl>
    <InputLabel id="Gender">Sexo</InputLabel>
    <Select input={<OutlinedInput label="Sexo"/>}required disabled={creado} id="Gender" defaultValue={patient.Gender || ''} placeholder="Seleccione" style={{width:"300px"}}
    {...register("Gender")}>
        { genero.map((option,index)=>(
            <MenuItem key ={index} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
            </Select>
    </FormControl>
        <TextField label="Celular" required disabled={creado} id="Phone" defaultValue={patient.Phone || ''} value={phone} type="number" placeholder='Celular' style={{width:"300px"}}{...register("Phone")} onChange={handledPhone} inputProps={{inputMode:"numeric", pattern:"[0-9]*"}} />
        <TextField label="Correo electrónico" required disabled={creado} id="Email" defaultValue={patient.Email || ''}  type="email" placeholder='Correo eléctronico' style={{width:"300px"}} {...register("Email")} inputProps={{maxLength:60}} />
    </div>
    <div className="flex gap-3 mt-96 justify-end">
    {(creando || editando || cancelar)  && <Button type="submit" startIcon={<Save/>} variant="contained" color="success">Guardar</Button>}
    {creado && <Button onClick={handleEditForm} startIcon={<Edit/>} variant="contained" color="info"> Editar </Button>}
    {(cancelar ||editando) && <Button onClick={handleOutForm} startIcon={<Undo/>} variant="contained" color="warning"> Cancelar</Button>}
    {(creando || creado) && <Button onClick={handleExitForm} startIcon={<CancelPresentationRounded/>} variant="contained" color="error">Salir</Button>}
    </div>
</form>
<div>
<Dialog open={open} onClose={onClose}>
        <DialogTitle>
            Confirmación
        </DialogTitle>
        <DialogContent>
            {
                cancelar&& <h1 style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Desea deshacer los cambios sin guardar?
            </h1>}
            {!cancelar&&<h1 style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Desea salir sin guardar los cambios?
            </h1>
            }       
        </DialogContent>
        <DialogActions>
            <Button  onClick={handleExitModal} variant="contained" color="success">
            Si
            </Button>
            <Button onClick={handleExit} variant="contained" color="error">No</Button>
        </DialogActions>
        

    </Dialog>
</div>
</div>
)}
export default CreatePatient 
