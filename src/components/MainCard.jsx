function MainCard({ children, title, addClass }) {
  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <div
        className={`w-full h-auto mb-5 py-3 px-2 rounded-md shadow-lg border border-gray-100 ${addClass}`}
      >
        {children}
      </div>
    </>
  );
}

export default MainCard;
