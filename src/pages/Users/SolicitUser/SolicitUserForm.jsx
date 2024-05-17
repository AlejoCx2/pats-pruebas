import SolicitUserInput from "./SolicitUserInput";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";

function SolicitUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((req_data) => {
    setIsLoading(true);
    console.log(req_data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col px-2 space-y-3 pb-2">
      <SolicitUserInput
        title="Nombre:"
        name="first_name"
        type="text"
        htmlFor="nombre_input"
        placeholder="Juan Camilo"
        register={register}
        errors={errors}
      />
      <SolicitUserInput
        title="Apellido:"
        name="last_name"
        type="text"
        htmlFor="apellido_input"
        placeholder="Ocampo Mutzzy"
        register={register}
        errors={errors}
      />
      <SolicitUserInput
        title="Cédula:"
        name="identification"
        type="text"
        htmlFor="cedula_input"
        placeholder="1144182203"
        register={register}
        errors={errors}
      />
      <SolicitUserInput
        title="Correo electrónico:"
        name="email"
        type="email"
        htmlFor="email_input"
        placeholder="juancamilo@gmail.com"
        register={register}
        errors={errors}
      />
      <SolicitUserInput
        title="Nit de la Empresa:"
        name="nit"
        type="text"
        htmlFor="nit_input"
        placeholder="123456789"
        register={register}
        errors={errors}
      />
      <div className="flex flex-col">
        <label
          htmlFor="erp_input"
          className="flex items-center text-sm font-medium"
        >
          <input
            {...register("erp", {})}
            type="checkbox"
            name="erp"
            id="erp_input"
            className="mr-2 accent-purple_senthia-100"
          />
          Acceso al ERP
        </label>
      </div>
      <div className="flex flex-col">
        <label htmlFor="cargo_input" className="text-sm font-medium">
          Cargo:
        </label>
        <select
          {...register("cargo", { required: true })}
          name="cargo"
          id="cargo_input"
          className="mt-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 outline-offset-2 outline-purple_senthia-100/[.50]"
        >
          <option value="">--Seleccionar--</option>
          <option value="JEFE DE CONTABILIDAD">JEFE DE CONTABILIDAD</option>
          <option value="DIRECTOR FINANCIERO">DIRECTOR FINANCIERO</option>
          <option value="COORDINADOR SOPORTE TI">COORDINADOR SOPORTE TI</option>
          <option value="JEFE CANAL DIGITAL">JEFE CANAL DIGITAL</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          className="inline-flex items-center px-4 py-2 rounded-md shadow-lg bg-purple_senthia-100 text-xs text-white transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
          type="submit"
        >
          <PaperAirplaneIcon className="w-4 h-4 stroke-2" />
          <span className="px-2">Enviar</span>
        </button>
      </div>
    </form>
  );
}
export default SolicitUserForm;
