import { useContext } from "react";
import { Context } from "./ContextProvider";
import { Link } from "react-router-dom";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function NoteBooks() {
  const { state } = useContext(Context);

  const notebooks = state.notebooks.allIds.map((id) => {
    const noteBook = state.notebooks.byId[id];
    return (
      <li key={id} className="flex gap-3 items-center">
        <FontAwesomeIcon icon={faBook} className="text-blue-600" />
        <Link to={`/note-project-manager/notebook/${id}`}>
          {noteBook.title}
        </Link>
      </li>
    );
  });

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-between pt-8">
      {/* <Outlet /> */}
      <ul className="flex flex-col gap-3 pl-10">{notebooks}</ul>
      <EntityCreator type={"notebook"} />
    </div>
  );
}

export default NoteBooks;
