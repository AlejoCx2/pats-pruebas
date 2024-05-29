import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import MainCard from "../../../components/MainCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateUserForm from "./CreateUserForm";
import CreateUserTable from "./CreateUserTable";

function CreateUser() {
  const token = useSelector((state) => state.user.value.jwt_access);
  const userRoles = useSelector((state) => state.user.value.roles);
  const userPermissions = useSelector((state) => state.user.value.permissions);
  const [requestSelected, setRequestSelected] = useState(null);
  const [lastDataReview, setLastDataReview] = useState(Date());
  const [users, setUsers] = useState([]);
  const [cargos, setCargos] = useState([]);
  const permissions = useLoaderData();
  const navegate = useNavigate();
  
  useEffect(() => {
    console.log('Check permission')
    if (permissions.roles.length) {
      if (!permissions.roles.some((elemento) => userRoles.includes(elemento))) {
        if (
          !permissions.permissions.some((elemento) =>
            userPermissions.includes(elemento)
          )
        ) {
          navegate("/dashboard");
        }
      }
    }
  }, []);

  useEffect(() => {
    getPendingRequests();
    const options = {
      method: "GET", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(import.meta.env.VITE_API_URL + "PATS/users/cargos", options)
      .then((res) => res.json())
      .then((data) => {
        setCargos(data);
      });
  }, [lastDataReview]);

  const getPendingRequests = () => {
    const options = {
      method: "GET", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      import.meta.env.VITE_API_URL + "PATS/users/request_user/list/to_create",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  return (
    <>
      {requestSelected === null && (
        <MainCard title="Pendientes" addClass="">
          <CreateUserTable
            users={users}
            setRequestSelected={setRequestSelected}
          />
        </MainCard>
      )}
      {requestSelected && (
        <MainCard title="Crear usuario" addClass="">
          <CreateUserForm
            request={requestSelected}
            cargos={cargos}
            setRequest={setRequestSelected}
            setLastDataReview={setLastDataReview}
          />
        </MainCard>
      )}
    </>
  );
}

export default CreateUser;
