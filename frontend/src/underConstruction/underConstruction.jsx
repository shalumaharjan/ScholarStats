function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="text-center">
        {/* <div className="text-7xl mb-6">🚧</div> */}

        <h1 className="text-4xl font-bold text-blue-600 text-align-center">
          UNDER CONSTRUCTION
        </h1>
        <p className="mt-4 text-gray-600 max-w-md">
          This feature is currently being developed. We are working hard to
          bring this module soon.
        </p>

        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default UnderConstruction;
