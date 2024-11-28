import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function goHome() {
    navigate("/note-project-manager");
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-slate-900">
      <h1 className="">404 Not Found</h1>
      <button onClick={goHome}>Return Home</button>
    </div>
  );
}

export default NotFound;
