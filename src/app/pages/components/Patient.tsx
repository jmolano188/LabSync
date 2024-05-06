'use client'
import {TableCell,Input,TableContainer,TableHead,TableRow,Paper,TablePagination,Button,Tooltip,Modal, Box,Table,TableBody, Dialog, DialogProps, DialogContent, IconButton, DialogActions, DialogTitle, } from '@mui/material';
import { AddCircle ,Delete, Edit, EditNoteOutlined, RemoveRedEyeOutlined, WarningAmberRounded} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CreatePatient from './CreatePatient';
import CreateOrder from './CreateOrder';
//import CreatePatient from "./CreatePatient";
//import CreateOrder from "./CreateOrder";


async function loadPatients(props:any) {
  const res = await fetch('http://localhost:3000/api/patients/search',{
    method: 'POST',
    body: JSON.stringify({
        page:props.page,
        pageSize:props.rowsPerPage,
        }),
    headers:{
        'content-type': 'aplication/json'
    }})
  console.log(res)
  const response = await res.json()
  return(response)
}

function Patient() {
  const [search,setSearch] = useState("")
  const [ordenando,setOrdenando] = useState(false)
  const [creando,setCreando] = useState(false)
  const [editando, setEditando] = useState(false)
  const [creado, setCreado] = useState(false)
  const [editarTabla, setEditarTabla] = useState(false)
  const [patient, setPatient] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [openModal1, setOpenModal1] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [deletePatient,setDeletedPatient] = useState(null)
  const [loading,setLoading] = useState(false)
  const [totalPatients,settotalPatients]=useState(0)
  const [page,setPage]=useState(0)  
  const [rowsPerPage,setRowsPerPage] = useState(5)
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');
  const handledChangePage = (event:unknown,newPage:number)=>{
    setPage(newPage)
    setLoading(false)
  }
  const handledChangeRowsPerPage = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
  }
  const handledCrearOrden =(row:any) =>{
    setOrdenando(true)
    setOpenModal2(true)
    setPatient(row)
  }

  const handledCreando = ()=>{
    setCreando(true)
    setEditando(false)
    setCreado(false)
    setEditarTabla(false)
    setPatient(null)
    setLoading(true)
    setOpen(true)
  }
  const handledEditando =(row:any)=>{
    setEditando(true)
    setCreado(false)
    setCreando(false)
    setEditarTabla(true)
    setPatient(row)
    setLoading(true)
    setOpen(true)
  }
  const handledVisualizar = (row:any) =>{
    setEditando(false)
    setCreado(true)
    setCreando(false)
    setEditarTabla(false)
    setPatient(row)
    setLoading(false)
    setOpen(true)
  }
  const handledEliminar = (row:any) =>{
    setEditando(false)
    setCreado(false)
    setCreando(false)
    setEditarTabla(false)
    setDeletedPatient(row.IdPatient)
    setOpenModal1(true)
  }
  const onCloseModal1 =() =>setOpenModal1(false)
  const onCloseModal2 =() =>setOpenModal2(false)
  const onClose =()=>setOpen(false)
  const handleDeletePatient = async () =>{
    setLoading(true)
    const response = await fetch('/api/patients/'+deletePatient,{
      method: 'DELETE',
      headers:{
        "Content-Type":"application/json"
      }})
    console.log(response)
    if(response.ok){
      setLoading(false)
      onCloseModal1()
      return;
    }
  }

  const [patients, setPatients] = useState<Array<any>>([]);
  // traer datos del api
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadPatients({page,rowsPerPage});
      setPatients(response.patient);
      settotalPatients(response.totalPatients)
    };
    fetchData();
  }, [loading,rowsPerPage,page]);

  // Funcion de filtrado
  const searcher = (Event:any) =>{
    setSearch(Event.target.value)
  }
  const closeCreatePatient =(dato:boolean)=>{
    if (dato){
      setLoading(false)
      onClose()
    }
  }
  // Funcion de busqueda
  const results= !search ? patients : patients.filter(data => {
    const name = `${data.FirstName} ${data.SecondName} ${data.FirstLastName} ${data.SecondLastName}`
    const res = name.toLowerCase().includes(search.toLowerCase())
    return res ? res: data.Identification.includes(search)
  }) 
  return (
<div>
    <div className="flex-wrap" style={{marginTop:"20px",marginLeft:"50px", marginRight:"50px",marginBottom:"50px"}}>
    <Input value = {search} onChange={searcher} type="text" placeholder="Search"/>
      <Button onClick={handledCreando} startIcon={<AddCircle/>}>
      Crear paciente</Button>
    </div> 
    <div  style={{marginTop:"50px",marginLeft:"50px", marginRight:"50px",marginBottom:"50px", border:"2px solid black "}} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>TIPO ID</TableCell>
            <TableCell>IDENTIFICACION</TableCell>
            <TableCell>NOMBRE</TableCell>
            <TableCell>FECHA NACIMIENTO</TableCell>
            <TableCell>EDAD</TableCell>
            <TableCell>SEXO</TableCell>
            <TableCell>CELULAR</TableCell>
            <TableCell>CORREO</TableCell>
            <TableCell>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((patient) => (
            <TableRow key={patient.IdPatient}>
              <TableCell>{patient.TipeId}</TableCell>
              <TableCell>{patient.Identification}</TableCell>
              <TableCell >
              {patient.FirstName} {patient.SecondName} {patient.FirstLastName} {patient.SecondLastName}
              </TableCell>
              <TableCell >{patient.Birthdate.split('T')[0]}</TableCell>
              <TableCell >{patient.Age}</TableCell>
              <TableCell>{patient.Gender}</TableCell>
              <TableCell>{patient.Phone}</TableCell>
              <TableCell>{patient.Email}</TableCell>
              <TableCell> 
              <Tooltip title ="Editar">
              <IconButton onClick={() =>handledEditando(patient)}  color="info">
                <Edit/>
              </IconButton>
              </Tooltip>
              <Tooltip title ="Visualizar">
              <IconButton onClick={() => handledVisualizar(patient)} color="secondary"><RemoveRedEyeOutlined/></IconButton>
              </Tooltip>
              <Tooltip title ="Crear orden">
              <IconButton onClick={()=>handledCrearOrden(patient)} color="success" ><EditNoteOutlined/></IconButton>
              </Tooltip>
              <Tooltip title ="Eliminar">
              <IconButton onClick={() => handledEliminar(patient)} color="error" ><Delete/></IconButton>
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination rowsPerPageOptions={[5,10]} component="div" 
              count={totalPatients} rowsPerPage={rowsPerPage} page={page}
              onPageChange={handledChangePage} onRowsPerPageChange={handledChangeRowsPerPage}
              labelRowsPerPage="Registros por página"/>
  </div>

<Dialog open={isOpen} onClose={onClose} fullWidth={fullWidth}
        maxWidth={maxWidth}>
    <DialogContent>
        <CreatePatient
        crear={creando}
        editar={editando}
        creado ={creado}
        editarTabla={editarTabla}
        salir={closeCreatePatient}
        patient = {patient}/>
      </DialogContent>  
</Dialog>

    <Dialog open={openModal2} onClose={onCloseModal2} fullWidth={fullWidth}
        maxWidth={maxWidth}>
        <CreateOrder
        ordenando ={ordenando}
        patient = {patient}/> 
    </Dialog>
  
  <Dialog open={openModal1} onClose={onCloseModal1} >
       <DialogTitle>Confirmación</DialogTitle>
       <DialogContent>
        <div >
            <span style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Seguro desea ELIMINAR el paciente?
        </span>
        </div>
        </DialogContent>
        <DialogActions>
            <Button  onClick={handleDeletePatient} variant="contained" color="success">
            Si
            </Button>
            <Button  onClick={onCloseModal1} variant="contained" color="error">No</Button>
        </DialogActions>
    </Dialog>

</div>

);
}
export default Patient;
