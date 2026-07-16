function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col items-center text-center">
        <img
          src="/assets/construction.svg"
          alt="Under Construction"
          className="w-40 max-w-full md:w-48"
        />

        <h1 className="mt-6 text-4xl font-bold text-blue-600">
          UNDER CONSTRUCTION
        </h1>

        <p className="mt-4 max-w-md text-gray-600">
          This feature is currently being developed. We are working hard to
          bring this module soon.
        </p>

        <button
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default UnderConstruction;
