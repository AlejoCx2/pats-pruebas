import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../state/user/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((req_data) => {
    setIsLoading(true);
    const options = {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        // Si necesitas incluir tokens de autenticación u otros headers, agrégalos aquí
      },
      body: JSON.stringify(req_data), // Convertimos el objeto de datos a un string JSON
    };
    
    fetch(import.meta.env.VITE_API_URL + "api/token/", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.access){
          const decode_JWT = jwtDecode(data.access)
          localStorage.refresh = data.refresh
          localStorage.access = data.access
          dispatch(
            setUser({
              auth: true,
              name: decode_JWT.name,
              roles: decode_JWT.roles,
              permissions: decode_JWT.permissions,
              jwt_access: data.access,
            })
          );
          navegate("/dashboard");
          toast.success("Login Exitoso")
        } else {
          setIsLoading(false);
          toast.error(data.detail);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-5/6 px-2 pt-2">
      <label htmlFor="username_input" className="mt-4 text-sm">
        Correo electrónico
      </label>
      <div className="grid grid-cols-7">
        <input
          autoComplete="off"
          {...register("username", {
            required: true,
          })}
          className="col-span-6 bg-gray_senthia rounded-md outline-offset-2 outline-gray-400 mt-1 p-2 text-sm"
          placeholder="james.cardona@senthia.com"
          type="email"
          name="username"
          id="username_input"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="bg-senthia-100 h-auto mt-1 py-2 px-2 text-white rounded-md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      </div>
      {errors.username && (
        <span className="text-xs text-rose-600">*Campo requerido</span>
      )}
      <label htmlFor="password_input" className="mt-4 text-sm">
        Contraseña
      </label>
      <div className="grid grid-cols-7">
        <input
          autoComplete="off"
          {...register("password", {
            required: true,
          })}
          className="col-span-6 bg-gray_senthia rounded-md outline-offset-2 outline-gray-400 mt-1 p-2 text-sm"
          placeholder="Ingrese su contraseña"
          type="password"
          name="password"
          id="password_input"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="bg-senthia-100 h-auto mt-1 py-2 px-2 text-white rounded-md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      {errors.password && (
        <span className="text-xs text-rose-600">*Campo requerido</span>
      )}
      <a href="#" className="text-xs flex flex-row-reverse underline mt-2">
        Olvido su clave?
      </a>
      <button
        type="submit"
        className="py-2 mt-5 mb-2 items-center rounded-md font-bold bg-senthia-100 hover:bg-senthia-200 text-white shadow-md"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div
              className="inline-block mx-2 h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
            Loading...
          </>
        ) : (
          "Ingresar"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
