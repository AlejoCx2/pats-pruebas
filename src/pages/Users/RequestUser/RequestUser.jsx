import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import MainCard from "../../../components/MainCard";
import RequestUserForm from "./RequestUserForm";
import RequestUserTable from "./RequestUserTable";

function RequestUser() {
  const token = useSelector((state) => state.user.value.jwt_access);
  const userRoles = useSelector((state) => state.user.value.roles);
  const userPermissions = useSelector((state) => state.user.value.permissions);
  const [isAddButton, setIsAddButton] = useState(false);
  const [lastDataReview, setLastDataReview] = useState(Date());
  const [users, setUsers] = useState([]);
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
    fetch(
      import.meta.env.VITE_API_URL + "PATS/users/request_user/list",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [lastDataReview]);

  return (
    <>
      <MainCard title="Mis solicitudes" addClass="">
        <RequestUserTable users={users} />
        <div className="flex grow justify-end">
          <button
            className="inline-flex items-center p-2 rounded-md shadow-lg bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
            onClick={() => {
              setIsAddButton(!isAddButton);
            }}
          >
            {isAddButton ? (
              <>
                <XMarkIcon className="w-4 h-4 stroke-2" />
                <span className="px-2">Cancelar</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 stroke-2" />
                <span className="px-2">Agrandar</span>
              </>
            )}
          </button>
        </div>
      </MainCard>
      {isAddButton && (
        <MainCard title="Solicitar usuario" addClass="">
          <RequestUserForm setLastDataReview={setLastDataReview} />
        </MainCard>
      )}
    </>
  );
}

export default RequestUser;
