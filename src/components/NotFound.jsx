import { useNavigate } from "react-router-dom";

function NotFound() {
  function goHome() {
    useNavigate("/note-project-manager");
  }

  return (
    <div>
      <h1>404 Not Found</h1>
      <button onClick={goHome}>Return Home</button>
    </div>
  );
}

export default NotFound;
