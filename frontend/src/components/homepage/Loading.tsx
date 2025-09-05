export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#E98657] border-solid"></div>
      <p className="ml-4 text-gray-600 font-medium">
        Loading ...
      </p>
    </div>
  );
}