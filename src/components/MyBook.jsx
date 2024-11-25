import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function MyBook() {
  const { state } = useContext(Context);
  const { notebookId } = useParams();
  const navigate = useNavigate();

  function goHome() {
    navigate("/note-project-manager");
  }

  if (!state.notebooks.allIds.includes(notebookId)) {
    return (
      <div>
        <h1>
          There is no notebook with id: <span>{notebookId}</span>
        </h1>
        <button onClick={goHome}>back</button>
      </div>
    );
  }

  const project = state.notebooks.byId[notebookId];

  const sections = project.sectionIds.map((id) => {
    const section = state.sections.byId[id];
    return (
      <li key={id} className="flex gap-3 items-center">
        <FontAwesomeIcon
          icon={faCircle}
          className="text-yellow-500"
        ></FontAwesomeIcon>
        <Link to={`/note-project-manager/notebook/${notebookId}/section/${id}`}>
          {section.title}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div>
        <p className="pl-10 pt-1">SECTIONS</p>
      </div>
      <div className="h-[calc(100vh-114px)] flex flex-col justify-between pt-8">
        <ul className="flex flex-col gap-3 pl-10">{sections}</ul>
        <EntityCreator type={"section"} />
      </div>
    </div>
  );
}

export default MyBook;
