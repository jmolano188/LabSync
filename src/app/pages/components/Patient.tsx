"use client";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";
import {Table,TableContainer,Tbody,Td,Th,Thead,Tr, Tooltip, Button, Input, Modal, ModalBody,  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  useDisclosure, } from "@chakra-ui/react"
import CreatePatient from "./CreatePatient";
async function loadPatients() {
  const res = await fetch("http://localhost:3000/api/patients");
  const response = await res.json();
  console.log(response);
  return response;
}

function Patient() {
  const [search,setSearch] = useState("") 
  const [patients, setPatients] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  // traer datos del api
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadPatients();
      setPatients(response);
    };
    fetchData();
  }, []);
  // Funcion de filtrado
  const searcher = (Event:any) =>{
    setSearch(Event.target.value)
  }
  const closeCreatePatient =(dato:boolean)=>{
    dato?onClose():null
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
      <Button onClick={onOpen} colorScheme="green" ml={10} >
      <AddIcon/>Crear paciente</Button>
    </div> 
    <div  style={{marginTop:"50px",marginLeft:"50px", marginRight:"50px",marginBottom:"50px", border:"2px solid black "}} >
    <TableContainer overflowX={"auto"} >
      <Table variant="simple" colorScheme='black'>
        <Thead>
          <Tr>
            <Th fontSize="lg"  >TIPO ID</Th>
            <Th fontSize="lg"  >IDENTIFICACION</Th>
            <Th fontSize="lg"  >NOMBRE</Th>
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
              <Td isNumeric>{patient.Age}</Td>
              <Td>{patient.Gender}</Td>
              <Td>{patient.Phone}</Td>
              <Td>{patient.Email}</Td>
              <Td> 
              <Tooltip label ="Editar">
              <Button w={10} borderRadius = "full" colorScheme="yellow" mr ={1}>
              <EditIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Visualizar">
              <Button w={10} borderRadius = "full" colorScheme="blue" mr ={1}>
              <ViewIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Crear orden">
              <Button w={10} borderRadius = "full" colorScheme="green" mr ={1}>
              <ExternalLinkIcon />
              </Button>
              </Tooltip>
              <Tooltip label ="Eliminar">
              <Button w={10} borderRadius = "full" colorScheme="red" >
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
        crear={true}
        editar={false}
        salir={closeCreatePatient}/>
        </ModalBody>
        </ModalContent>
    </Modal>
</div>
);
}
export default Patient;
