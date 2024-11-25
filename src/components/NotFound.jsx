import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function goHome() {
    navigate("/note-project-manager");
  }

  return (
    <div>
      <h1>404 Not Found</h1>
      <button onClick={goHome}>Return Home</button>
    </div>
  );
}

export default NotFound;
