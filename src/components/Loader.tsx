function Loader() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-base-100 text-center">
      <div className="loading loading-spinner loading-lg text-primary"></div>
      <p className="text-lg text-gray-500 mt-4">Loading, please wait...</p>
    </div>
  );
}

export default Loader;
