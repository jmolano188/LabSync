"use client";
import { useEffect, useState } from "react";
import {Table,TableContainer,Tbody,Td,Th,Thead,Tr,} from "@chakra-ui/react";

async function loadPatients() {
  const res = await fetch("http://localhost:3000/api/patients");
  const response = await res.json();
  console.log(response);
  return response;
}

function Patient() {
  const [patients, setPatients] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadPatients();
      setPatients(response);
    };
    fetchData();
  }, []);
  return (
<div>

    <TableContainer>
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
          {patients.map((patient) => (
              <Tr key={patient.IdPatient}>
              <Td>{patient.TipeId}</Td>
              <Td>{patient.Identification}</Td>
              <Td>
                {patient.FirstName} {patient.SecondName} {patient.FirstLastName}{" "}
                {patient.SecondLastName}
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
