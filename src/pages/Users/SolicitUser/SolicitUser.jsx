import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MainCard from "../../../components/MainCard";
import SolicitUserForm from "./SolicitUserForm";

function SolicitUser() {
  const [isAddButton, setIsAddButton] = useState(false);

  return (
    <>
      <MainCard title="Mis solicitudes" addClass="flex justify-center">
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
          ) :(
            <>
              <PlusIcon className="w-4 h-4 stroke-2" />
              <span className="px-2">Agrandar</span>
            </>
          )}
        </button>
      </MainCard>
      {isAddButton && (
        <MainCard title="Solicitar usuario" addClass="">
          <SolicitUserForm />
        </MainCard>
      )}
    </>
  );
}

export default SolicitUser;
