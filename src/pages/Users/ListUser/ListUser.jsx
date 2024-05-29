import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import MainCard from "../../../components/MainCard";
import UserTable from "./UserTable";
import UpdateUserForm from "../UpdateUser/UpdateUserForm";
import { PlusIcon } from "@heroicons/react/24/outline";

function ListUser() {
  const userRoles = useSelector((state) => state.user.value.roles);
  const userPermissions = useSelector((state) => state.user.value.permissions);
  const token = useSelector((state) => state.user.value.jwt_access);
  const [userSelected, setUserSelected] = useState(null);
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
    const options = {
      method: "GET", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(import.meta.env.VITE_API_URL + "PATS/users/list", options)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
    fetch(import.meta.env.VITE_API_URL + "PATS/users/cargos", options)
      .then((res) => res.json())
      .then((data) => {
        setCargos(data);
      });
  }, [lastDataReview]);

  return (
    <>
      {userSelected === null && (
        <MainCard title="Usuarios" addClass="">
          <UserTable users={users} setUserSelected={setUserSelected} />
        </MainCard>
      )}
      {userSelected && (
        <MainCard title="Editar Usuario" addClass="">
          <UpdateUserForm
            user={userSelected}
            cargos={cargos}
            setLastDataReview={setLastDataReview}
            setUserSelected={setUserSelected}
          />
        </MainCard>
      )}
    </>
  );
}

export default ListUser;
