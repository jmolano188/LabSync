"use client";
import { useEffect, useState } from "react";
import {Table,TableContainer,Tbody,Td,Th,Thead,Tr, Input } from "@chakra-ui/react";
import { serialize } from "v8";

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
    console.log(Event.target)
  }
  // Funcion de busqueda
  const results= !search ? patients : patients.filter(data =>                                                    
                                                              data.FirstName.toLowerCase().includes(search.toLowerCase()) ||
                                                              data.SecondName.toLowerCase().includes(search.toLowerCase()) ||
                                                              data.FirstLastName.toLowerCase().includes(search.toLowerCase()) ||
                                                              data.SecondLastName.toLowerCase().includes(search.toLowerCase()) ||
                                                              data.Identification.includes(search));
  console.log(results)
  return (
<div>
    <Input value = {search} onChange={searcher} type="text" placeholder="Search" 
            focusBorderColor='black' colorScheme="purple" width="500px" />
    <TableContainer marginTop="20px">
      <Table variant="simple" colorScheme='black'>
        <Thead>
          <Tr>
            <Th fontSize="lg" textAlign={"center"}>TIPO ID</Th>
            <Th fontSize="lg" textAlign={"center"} >IDENTIFICACION</Th>
            <Th fontSize="lg" textAlign={"center"} >NOMBRE</Th>
            <Th fontSize="lg" textAlign={"center"}  isNumeric>EDAD</Th>
            <Th fontSize="lg" textAlign={"center"} >SEXO</Th>
            <Th fontSize="lg" textAlign={"center"} >CELULAR</Th>
            <Th fontSize="lg" textAlign={"center"} >CORREO</Th>
            <Th fontSize="lg" textAlign={"center"} >ACCIONES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((patient) => (
              <Tr key={patient.IdPatient}>
              <Td>{patient.TipeId}</Td>
              <Td>{patient.Identification}</Td>
              <Td>
                {patient.FirstName} {patient.SecondName} {patient.FirstLastName} {patient.SecondLastName}
              </Td>
              <Td isNumeric>{patient.Age}</Td>
              <Td>{patient.Gender}</Td>
              <Td>{patient.Phone}</Td>
              <Td>{patient.Email}</Td>
              <Td>ACCIONES</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
</div>
);
}
export default Patient;
