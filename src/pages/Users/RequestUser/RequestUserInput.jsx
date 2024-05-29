import { useForm } from "react-hook-form";

function RequestUserInput({
  title,
  name,
  type,
  addClassInput = "",
  addClassDiv = "",
  htmlFor,
  placeholder,
  pattern,
  message,
  register,
  errors,
}) {
  // Pasar como props lo de formsHooks
  return (
    <div className={`flex flex-col ${addClassDiv}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {title}
      </label>
      <input
        {...register(`${name}`, {
          required: "*Campo requerido",
          pattern: { value: pattern, message: message },
        })}
        className={`mt-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 outline-offset-2 outline-purple_senthia-100/[.50] ${addClassInput}`}
        type={type}
        name={name}
        placeholder={placeholder}
        id={htmlFor}
      />
      <span className="text-xs text-rose-600">{errors[name]?.message}</span>
    </div>
  );
}

export default RequestUserInput;
