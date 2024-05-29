import {
  XMarkIcon,
  CheckIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AproveUserInput from "./AproveUserInput";

function AproveUserForm({
  request,
  cargos = [],
  setRequest,
  setLastDataReview,
}) {
  const token = useSelector((state) => state.user.value.jwt_access);
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
    },
  });

  const changeStateFetch = (reqState) => {
    const options = {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqState),
    };
    fetch(
      import.meta.env.VITE_API_URL + "PATS/users/request_user/change_state",
      options
    )
      .then((res) => res.json())
      .then((data) => {
      });
  };

  const onSubmitReject = (req_data) => {
    const reqState = { id: request.id, state: "reject" };
    changeStateFetch(reqState);
    setLastDataReview(Date());
    setRequest(null);
  };

  const onSubmitAprove = (req_data) => {
    const reqState = { id: request.id, state: "aprove" };
    changeStateFetch(reqState);
    setLastDataReview(Date());
    setRequest(null);
  };

  const onSubmitCancel = (req_data) => {
    setRequest(null);
  };

  return (
    <form className="flex flex-col px-2 space-y-3 pb-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <AproveUserInput
        title="Nombre:"
        name="first_name"
        type="text"
        htmlFor="nombre_input"
        register={register}
      />
      <AproveUserInput
        title="Apellido:"
        name="last_name"
        type="text"
        htmlFor="apellido_input"
        register={register}
      />
      <AproveUserInput
        title="Cédula:"
        name="cedula"
        type="text"
        htmlFor="cedula_input"
        register={register}
      />
      <AproveUserInput
        title="Correo electrónico:"
        name="email"
        type="email"
        htmlFor="email_input"
        register={register}
      />
      <AproveUserInput
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
        <div className="flex justify-end grow space-x-2">
          <button
            id="reject"
            onClick={handleSubmit(onSubmitReject)}
            className="inline-flex items-center px-2 py-2 md:my-1 md:px-4 rounded-md shadow-lg bg-red-800 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
            type="submit"
          >
            <NoSymbolIcon className="w-4 h-4 stroke-2" />
            <span className="px-2">Rechazar</span>
          </button>
          <button
            id="aprove"
            onClick={handleSubmit(onSubmitAprove)}
            className="inline-flex items-center px-2 py-2 md:my-1 md:px-4 rounded-md shadow-lg bg-green-800 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
            type="submit"
          >
            <CheckIcon className="w-4 h-4 stroke-2" />
            <span className="px-2">Aprobar</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default AproveUserForm;
