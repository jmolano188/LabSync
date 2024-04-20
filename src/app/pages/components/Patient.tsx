"use client";
import { useEffect, useState } from "react";
import {Table,TableContainer,Tbody,Td,Th,Thead,Tr, Input, Button, Tooltip, } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ExternalLinkIcon, ViewIcon } from "@chakra-ui/icons";

async function loadPatients() {
  const res = await fetch("http://localhost:3000/api/patients");
  const response = await res.json();
  console.log(response);
  return response;
}

function Patient() {
  const [search,setSearch] = useState("") 
  const [patients, setPatients] = useState<Array<any>>([]);
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
  // Funcion de busqueda
  const results= !search ? patients : patients.filter(data => {
    const name = `${data.FirstName}  ${data.SecondName} ${data.FirstLastName} ${data.SecondLastName}`
    const res = name.toLowerCase().includes(search.toLowerCase())
    return res ? res: data.Identification.includes(search)
    console.log(res)
  }) 
  return (
<div>
    <Input value = {search} onChange={searcher} type="text" placeholder="Search" 
            focusBorderColor='black' colorScheme="purple" width="500px" />
    <TableContainer marginTop="20px">
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
);
}
export default Patient;
