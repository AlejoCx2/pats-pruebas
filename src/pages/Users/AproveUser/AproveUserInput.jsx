function AproveUserInput({ title, name, type, htmlFor, register }) {
  // Pasar como props lo de formsHooks
  return (
    <div className={`flex flex-col`}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {title}
      </label>
      <input
        {...register(`${name}`, {})}
        className={`mt-1 py-1 px-2 rounded-md text-sm font-semibold text-purple_senthia-75 bg-purple_senthia-25 outline-offset-2 outline-purple_senthia-100/[.50]`}
        type={type}
        name={name}
        id={htmlFor}
        disabled={true}
      />
    </div>
  );
}

export default AproveUserInput;
