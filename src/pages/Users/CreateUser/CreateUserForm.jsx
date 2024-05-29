import {
  XMarkIcon,
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateUserInput from "./CreateUserInput";

function CreateUserForm({
  request,
  cargos = [],
  setRequest,
  setLastDataReview,
}) {
  const token = useSelector((state) => state.user.value.jwt_access);
  const [isUsernameDisable, setIsUsernameDisable] = useState(true);
  const [isPasswordDisable, setIsPasswordDisable] = useState(true);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      cedula: request.cedula,
      email: request.email,
      first_name: request.first_name,
      last_name: request.last_name,
      is_erp: request.is_erp,
      is_office: request.is_office,
      is_exchange: request.is_exchange,
      cargo: `${request.cargo}`,
      company: request.company_name,
      username: request.username,
      password: request.cedula,
    },
  });

  const onSubmitCreate = (req_data) => {
    const req_info = {
      id: request.id,
      username: req_data.username,
      password: req_data.password,
    };
    const options = {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req_info),
    };
    fetch(
      import.meta.env.VITE_API_URL + "PATS/users/request_user/create",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          toast.success("Creacion exitosa");
          setLastDataReview(Date());
          setRequest(null);
        } else if (data.status === 400) {
          showAlert(data);
        } else {
          console.log(data);
        }
      });
  };

  const onSubmitCancel = (req_data) => {
    setRequest(null);
  };

  const changeUsernameEnable = (req_data) => {
    setIsUsernameDisable(!isUsernameDisable);
  };

  const changePasswordEnable = (req_data) => {
    setIsPasswordDisable(!isPasswordDisable);
  };

  const showAlert = (data) => {
    toast.custom((t) => (
      <div
        className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5 text-red-700">
              <ExclamationCircleIcon className="w-10 h-10" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{data.title}</p>
              <p className="mt-1 text-sm text-gray-500">{data.description}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-purple_senthia-200 hover:bg-purple_senthia-25"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <form className="flex flex-col px-2 space-y-3 pb-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <CreateUserInput
        title="Nombre:"
        name="first_name"
        type="text"
        htmlFor="nombre_input"
        register={register}
      />
      <CreateUserInput
        title="Apellido:"
        name="last_name"
        type="text"
        htmlFor="apellido_input"
        register={register}
      />
      <CreateUserInput
        title="Cédula:"
        name="cedula"
        type="text"
        htmlFor="cedula_input"
        register={register}
      />
      <CreateUserInput
        title="Correo electrónico:"
        name="email"
        type="email"
        htmlFor="email_input"
        register={register}
      />
      <CreateUserInput
        title="Nit de la Empresa:"
        name="company"
        type="text"
        htmlFor="nit_input"
        register={register}
      />
      <div className="flex flex-col">
        <label
          htmlFor="erp_input"
          className="flex items-center text-sm font-medium md:mt-1"
        >
          <input
            {...register("is_erp", {})}
            type="checkbox"
            name="is_erp"
            id="erp_input"
            className="mr-2 accent-purple_senthia-100"
            disabled={true}
          />
          Acceso al ERP
        </label>
        <label
          htmlFor="office_input"
          className="flex items-center text-sm font-medium md:mt-1"
        >
          <input
            {...register("is_office", {})}
            type="checkbox"
            name="is_office"
            id="office_input"
            className="mr-2 accent-purple_senthia-100"
            disabled={true}
          />
          Uso Office
        </label>
        <label
          htmlFor="exchange_input"
          className="flex items-center text-sm font-medium md:mt-1"
        >
          <input
            {...register("is_exchange", {})}
            type="checkbox"
            name="is_exchange"
            id="exchange_input"
            className="mr-2 accent-purple_senthia-100"
            disabled={true}
          />
          Uso Exchange
        </label>
      </div>
      <div className="flex flex-col col-span-2">
        <label htmlFor="cargo_input" className="text-sm font-medium">
          Cargo:
        </label>
        <select
          {...register("cargo", {})}
          name="cargo"
          id="cargo_input"
          className="my-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 outline-offset-2 outline-purple_senthia-100/[.50]"
          disabled={true}
        >
          <option value="">--Seleccionar--</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.name}
            </option>
          ))}
        </select>
      </div>
      <div className={`flex flex-col`}>
        <label htmlFor="username_input" className="text-sm font-medium">
          Usuario:
        </label>
        <div className="inline-flex">
          <input
            {...register("username", {})}
            className={`mt-1 py-1 px-2 grow rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 ${
              !isUsernameDisable &&
              "border border-purple_senthia-100 bg-slate-100"
            } outline-offset-2 outline-purple_senthia-100/[.50]`}
            type="email"
            name="username"
            id="username_input"
            disabled={isUsernameDisable}
          />
          <button
            onClick={handleSubmit(changeUsernameEnable)}
            className="mt-1 p-2 rounded-md bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
          >
            {isUsernameDisable ? (
              <LockClosedIcon className="w-4 h-4 stroke-2" />
            ) : (
              <LockOpenIcon className="w-4 h-4 stroke-2" />
            )}
          </button>
        </div>
      </div>
      <div className={`flex flex-col`}>
        <label htmlFor="password_input" className="text-sm font-medium">
          Contraseña:
        </label>
        <div className="inline-flex">
          <input
            {...register("password", {})}
            className={`mt-1 py-1 px-2 grow rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 ${
              !isPasswordDisable &&
              "border border-purple_senthia-100 bg-slate-100"
            } outline-offset-2 outline-purple_senthia-100/[.50]`}
            type="text"
            name="password"
            id="password_input"
            disabled={isPasswordDisable}
          />
          <button
            onClick={handleSubmit(changePasswordEnable)}
            className="mt-1 p-2 rounded-md bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
          >
            {isPasswordDisable ? (
              <LockClosedIcon className="w-4 h-4 stroke-2" />
            ) : (
              <LockOpenIcon className="w-4 h-4 stroke-2" />
            )}
          </button>
        </div>
      </div>
      <div className="flex col-span-2">
        <button
          id="cancel"
          onClick={handleSubmit(onSubmitCancel)}
          className="inline-flex items-center px-2 py-2 md:my-1 md:px-4 rounded-md shadow-lg bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
          type="submit"
        >
          <XMarkIcon className="w-4 h-4 stroke-2" />
          <span className="px-2">Cancelar</span>
        </button>
        <div className="flex justify-end grow">
          <button
            id="aprove"
            onClick={handleSubmit(onSubmitCreate)}
            className="inline-flex items-center px-2 py-2 md:my-1 md:px-4 rounded-md shadow-lg bg-green-800 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
            type="submit"
          >
            <CheckIcon className="w-4 h-4 stroke-2" />
            <span className="px-2">Crear</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateUserForm;
