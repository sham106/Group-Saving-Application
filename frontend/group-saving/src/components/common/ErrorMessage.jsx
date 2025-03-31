const ErrorMessage = ({ message }) => {
    return (
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;