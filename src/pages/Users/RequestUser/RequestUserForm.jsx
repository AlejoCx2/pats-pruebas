import RequestUserInput from "./RequestUserInput";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RequestUserForm({ setLastDataReview }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cargos, setCargos] = useState([]);
  const token = useSelector((state) => state.user.value.jwt_access);
  useEffect(() => {
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
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((req_data) => {
    setIsLoading(true);
    const options = {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req_data),
    };
    fetch(import.meta.env.VITE_API_URL + "PATS/users/request_user", options)
      .then((res) => res.json())
      .then((data) => {
        setLastDataReview(Date());
        reset();
      });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col px-2 space-y-3 pb-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
    >
      <RequestUserInput
        title="Nombre:"
        name="first_name"
        type="text"
        htmlFor="nombre_input"
        placeholder="Mis Nombres"
        register={register}
        errors={errors}
        pattern={/^[A-Za-z\s]+$/i}
        message="*Solo caracteres alfabeticos"
      />
      <RequestUserInput
        title="Apellido:"
        name="last_name"
        type="text"
        htmlFor="apellido_input"
        placeholder="Mis Nombres"
        register={register}
        errors={errors}
        pattern={/^[A-Za-z\s]+$/i}
        message="*Solo caracteres alfabeticos"
      />
      <RequestUserInput
        title="Cédula:"
        name="cedula"
        type="text"
        htmlFor="cedula_input"
        placeholder="11223344"
        register={register}
        errors={errors}
        pattern={/^[0-9]+$/i}
        message="*Solo caracteres numericos"
      />
      <RequestUserInput
        title="Correo electrónico:"
        name="email"
        type="email"
        htmlFor="email_input"
        placeholder="micorreo@gmail.com"
        register={register}
        errors={errors}
      />
      <RequestUserInput
        title="Nit de la Empresa:"
        name="company"
        type="text"
        htmlFor="nit_input"
        placeholder="123456789"
        register={register}
        errors={errors}
        pattern={/^[0-9]+$/i}
        message="*Solo caracteres numericos"
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
          />
          Uso Exchange
        </label>
      </div>
      <div className="flex flex-col">
        <label htmlFor="cargo_input" className="text-sm font-medium">
          Cargo:
        </label>
        <select
          {...register("cargo", { required: "*Campo requerido" })}
          name="cargo"
          id="cargo_input"
          className="my-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 outline-offset-2 outline-purple_senthia-100/[.50]"
        >
          <option value="">--Seleccionar--</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.name}
            </option>
          ))}
        </select>
        <span className="text-xs text-rose-600">{errors.cargo?.message}</span>
      </div>
      <div className="flex justify-end">
        <button
          className="inline-flex items-center px-4 py-2 md:my-1 md:px-8 rounded-md shadow-lg bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
          type="submit"
        >
          <PaperAirplaneIcon className="w-4 h-4 stroke-2" />
          <span className="px-2">Enviar</span>
        </button>
      </div>
    </form>
  );
}
export default RequestUserForm;
