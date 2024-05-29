function UpdateUserInput({
  title,
  name,
  type,
  htmlFor,
  register,
  placeholder="",
  isDisable = true,
}) {
  // Pasar como props lo de formsHooks
  return (
    <div className={`flex flex-col`}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {title}
      </label>
      <input
        {...register(`${name}`, {})}
        className={`mt-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 ${
          isDisable
            ? "bg-purple_senthia-25"
            : "border border-purple_senthia-100 bg-slate-100"
        } outline-offset-2 outline-purple_senthia-100/[.50]`}
        type={type}
        name={name}
        id={htmlFor}
        placeholder={placeholder}
        disabled={isDisable}
      />
    </div>
  );
}

export default UpdateUserInput;
