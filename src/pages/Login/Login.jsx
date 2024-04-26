import { useForm } from "react-hook-form";
import LoginForm from "./LoginForm";

function Login() {

    return (
        <div className="bg-gray_senthia flex flex-row h-screen w-screen justify-center items-center md:items-start">
            <div className="bg-white flex flex-none flex-col py-10 md:py-0 items-center justify-center w-96 h-fit md:h-screen shadow-xl">
                <div>
                    Title
                </div>
                <span className="my-2 font-bold">
                    Login into your account
                </span>
                <LoginForm />
                <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 w-20 h-px bg-gray-300"></div>
                    <span className="text-gray-400">or</span>
                    <div className="flex-1 w-20 h-px bg-gray-300"></div>
                </div>
                <button className="w-5/6 py-2 my-2 rounded-md font-bold border border-senthia-100 text-senthia-100 hover:bg-gray-200 shadow-md">
                    Registrarse
                </button>
            </div>
            <div className="hidden md:flex flex-auto h-screen bg-gray_senthia">
                <p>Lorem</p>
            </div>
        </div>
    )
}

export default Login