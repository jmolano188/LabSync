"use client";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, ViewIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {Table,TableContainer,Tbody,Td,Th,Thead,Tr, Tooltip, Button, Input, Modal, ModalBody,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  useDisclosure, } from "@chakra-ui/react"
import CreatePatient from "./CreatePatient";

async function loadPatients() {
  const res = await fetch("http://localhost:3000/api/patients");
  const response = await res.json();
  return response;
}

function Patient() {
  const [search,setSearch] = useState("")
  const [creando,setCreando] = useState(false)
  const [editando, setEditando] = useState(false)
  const [creado, setCreado] = useState(false)
  const [editarTabla, setEditarTabla] = useState(false)
  const [patient, setPatient] = useState(null)
  const [openModal1, setOpenModal1] = useState(false)
  const [deletePatient,setDeletedPatient] = useState(null)
  const [loading,setLoading] = useState(false)

  const handledCreando = ()=>{
    setCreando(true)
    setEditando(false)
    setCreado(false)
    setEditarTabla(false)
    setPatient(null)
    setLoading(true)
    onOpen()
  }
  const handledEditando =(row:any)=>{
    setEditando(true)
    setCreado(false)
    setCreando(false)
    setEditarTabla(true)
    setPatient(row)
    setLoading(true)
    onOpen()
  }
  const handledVisualizar = (row:any) =>{
    setEditando(false)
    setCreado(true)
    setCreando(false)
    setEditarTabla(false)
    setPatient(row)
    setLoading(false)
    onOpen()
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  // traer datos del api
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadPatients();
      setPatients(response);
    };
    fetchData();
  }, [loading]);
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
    const name = `${data.FirstName}  ${data.SecondName} ${data.FirstLastName} ${data.SecondLastName}`
    const res = name.toLowerCase().includes(search.toLowerCase())
    return res ? res: data.Identification.includes(search)
  }) 
  return (
<div>
    <div className="flex-wrap" style={{marginTop:"20px",marginLeft:"50px", marginRight:"50px",marginBottom:"50px"}}>
    <Input value = {search} onChange={searcher} type="text" placeholder="Search" 
          focusBorderColor='black' border={"2px solid black"} width="500px" />
      <Button onClick={handledCreando} colorScheme="green" ml={10} >
      <AddIcon/>Crear paciente</Button>
    </div> 
    <div  style={{marginTop:"50px",marginLeft:"50px", marginRight:"50px",marginBottom:"50px", border:"2px solid black "}} >
    <TableContainer overflowX={"auto"} >
      <Table variant="simple" colorScheme='black'>
        <Thead backgroundColor={"#FF5B5E"}  >
          <Tr >
            <Th fontSize="lg"  >TIPO ID</Th>
            <Th fontSize="lg"  >IDENTIFICACION</Th>
            <Th fontSize="lg"  >NOMBRE</Th>
            <Th fontSize="lg"  >FECHA NACIMIENTO</Th>
            <Th fontSize="lg"   isNumeric>EDAD</Th>
            <Th fontSize="lg"  >SEXO</Th>
            <Th fontSize="lg"  >CELULAR</Th>
            <Th fontSize="lg"  >CORREO</Th>
            <Th fontSize="lg"  >ACCIONES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((patient) => (
            <Tr key={patient.IdPatient}>
              <Td>{patient.TipeId}</Td>
              <Td>{patient.Identification}</Td>
              <Td >
              {patient.FirstName} {patient.SecondName} {patient.FirstLastName} {patient.SecondLastName}
              </Td>
              <Td >{patient.Birthdate.split('T')[0]}</Td>
              <Td isNumeric>{patient.Age}</Td>
              <Td>{patient.Gender}</Td>
              <Td>{patient.Phone}</Td>
              <Td>{patient.Email}</Td>
              <Td> 
              <Tooltip label ="Editar">
              <Button onClick={() =>handledEditando(patient)} w={10} borderRadius = "full" colorScheme="yellow" mr ={1}>
              <EditIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Visualizar">
              <Button onClick={() => handledVisualizar(patient)} w={10} borderRadius = "full" colorScheme="blue" mr ={1}>
              <ViewIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Crear orden">
              <Button w={10} borderRadius = "full" colorScheme="green" mr ={1}>
              <ExternalLinkIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Eliminar">
              <Button onClick={() => handledEliminar(patient)} w={10} borderRadius = "full" colorScheme="red" >
              <DeleteIcon/>
              </Button>
              </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </div>

<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
<ModalOverlay />
        <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <CreatePatient
        crear={creando}
        editar={editando}
        creado ={creado}
        editarTabla={editarTabla}
        salir={closeCreatePatient}
        patient = {patient}/>
        </ModalBody>
        </ModalContent>
    </Modal>
  
  <Modal closeOnOverlayClick={false} isOpen={openModal1} onClose={onCloseModal1} isCentered size={"lg"}>
  <ModalOverlay />
        <ModalContent>
        <ModalHeader>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <div >
        <WarningTwoIcon color={"red"} boxSize={10} mr={4}/>
            <span style={{fontFamily:'Arial,sans-serif',fontSize:"20px"}}>
            ¿Seguro desea ELIMINAR el paciente?
        </span>
        </div>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleDeletePatient}>
            Si
            </Button>
            <Button colorScheme="red" onClick={onCloseModal1}>No</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>

</div>

);
}
export default Patient;
