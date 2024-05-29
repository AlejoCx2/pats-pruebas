import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateUserInput from "./UpdateUserInput";
import toast from "react-hot-toast";

function UpdateUserForm({ user, cargos = [], setLastDataReview, setUserSelected }) {
  const token = useSelector((state) => state.user.value.jwt_access);
  const [userActive, setUserActive] = useState(user.user.is_active);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      cedula: user.cedula,
      email: user.user.email,
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      is_erp: user.is_erp,
      is_office: user.is_office,
      is_exchange: user.is_exchange,
      cargo: `${user.cargo.id}`,
      company: user.company.name,
      username: user.user.username
    },
  });

  const updateUserFetch = (req_data) => {
    const options = {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req_data),
    };
    fetch(
      import.meta.env.VITE_API_URL + "PATS/users/update",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success("Actualización exitosa");
          setLastDataReview(Date());
          setUserSelected(null);
        } else if (data.status === 400) {
          showAlert(data);
        } else {
          console.log(data);
        }
      });
  };

  const onSubmitUpdate = (req_data) => {
    req_data.id = user.id
    req_data.is_active = userActive
    updateUserFetch(req_data);
  };

  const onSubmitCancel = (req_data) => {
    setUserSelected(null);
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
      <UpdateUserInput
        title="Cédula:"
        name="cedula"
        type="text"
        htmlFor="cedula_input"
        register={register}
      />
      <UpdateUserInput
        title="Nit de la Empresa:"
        name="company"
        type="text"
        htmlFor="nit_input"
        register={register}
      />
      <UpdateUserInput
        title="Nombre:"
        name="first_name"
        type="text"
        htmlFor="nombre_input"
        register={register}
        isDisable={false}
      />
      <UpdateUserInput
        title="Apellido:"
        name="last_name"
        type="text"
        htmlFor="apellido_input"
        register={register}
        isDisable={false}
      />

      <UpdateUserInput
        title="Correo electrónico:"
        name="email"
        type="email"
        htmlFor="email_input"
        register={register}
        isDisable={false}
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
            disabled={false}
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
            disabled={false}
          />
          Licencia Office
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
            disabled={false}
          />
            Licencia Exchange
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
          className="my-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 border border-purple_senthia-100 bg-slate-100 outline-offset-2 outline-purple_senthia-100/[.50]"
          disabled={false}
        >
          <option value="">--Seleccionar--</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.name}
            </option>
          ))}
        </select>
      </div>
      <UpdateUserInput
        title="Nombre de usuario:"
        name="username"
        type="email"
        htmlFor="username_input"
        register={register}
        isDisable={false}
      />
      <UpdateUserInput
        title="Cambiar Contraseña:"
        name="password"
        type="text"
        htmlFor="password_input"
        placeholder="✱✱✱✱✱✱✱"
        register={register}
        isDisable={false}
      />
      <div className="flex items-center py-2 md:py-1">
        <label htmlFor="active_button" className="text-sm font-medium mr-1">
          Estado:
        </label>
        <button
          id="active_button"
          onClick={handleSubmit(()=>{setUserActive(!userActive)})}
          className={`inline-flex items-center px-1 py-1 md:my-1 md:px-1 rounded-md shadow-lg ${userActive ? "bg-green-800 hover:bg-green-900" : "bg-red-800 hover:bg-red-900"} text-xs text-white transition-all duration-75 hover:scale-105`}
        >
          <span className="px-2">{userActive ? "Activo" : "Inactivo"}</span>
        </button>
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
            id="update"
            onClick={handleSubmit(onSubmitUpdate)}
            className="inline-flex items-center px-2 py-2 md:my-1 md:px-4 rounded-md shadow-lg bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
            type="submit"
          >
            <ArrowPathIcon className="w-4 h-4 stroke-2" />
            <span className="px-2">Actualizar</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserForm;
