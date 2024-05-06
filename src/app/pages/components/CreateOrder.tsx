 'use client'
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { tipoId,genero } from "../../../../public/list";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Close } from "@mui/icons-material";

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
        <div className="m-10">
            <form action="">
             <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField label="Nombre" disabled id="nombre" defaultValue={`${patient.FirstName} ${patient.SecondName}  ${patient.FirstLastName} ${patient.SecondLastName} ` || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField disabled label="Tipo Id" defaultValue={patient.TipeId || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField disabled label="Identificación" defaultValue={patient.Identification || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField disabled label="Sexo" defaultValue={patient.Gender || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField disabled label="Edad" defaultValue={patient.Age || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField disabled label="Fecha Nacimiento" id="Birthdate" defaultValue={patient.Birthdate ? patient.Birthdate.substring(0, 10) || '' : ''} type="date" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField disabled label="Estado" defaultValue={'Activa'} fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="Diagnostico">Diagnostico</InputLabel>
                    <Select required label="Diagnostico " id="Diagnostico" input={<OutlinedInput label="Diagnostico" />} {...register("IdDiagnostic")} defaultValue={ ''}  style={{width:"100%"}}>
                        {diagnostic.map((option, IdDiagnostic) => (
                            <MenuItem key={IdDiagnostic} value={option.IdDiagnostic}>
                                {option.CodeDiagnostic} {option.NameDiagnostic}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="Medico">Médico</InputLabel>
                    <Select id="Medico" input={<OutlinedInput label="Médico" />} placeholder="Seleccione" {...register("IdProfessional")} defaultValue={ ''} >
                        {profesional.map((option, IdProfessional) => (
                            <MenuItem key={IdProfessional} value={option.IdProfessional}>
                                {option.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                </Grid>
                <div className="flex gap-3 mt-96 justify-end">
                    <Button type="submit" startIcon={<Check />} >Guardar </Button>
                    <Button startIcon={<Close />} >Salir</Button>
                </div>
           
            </form> 
        </div>
    )
} export default CreateOrder; 