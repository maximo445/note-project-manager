import { useContext } from "react";
import { Context } from "./ContextProvider";
import { Link } from "react-router-dom";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function NoteBooks() {
  const { state, dispatch } = useContext(Context);

  function handleNotebookDeletion(notebookId, state, dispatch) {
    const sectionsToDelete = state.notebooks.byId[notebookId]?.sectionIds || [];

    // Dispatch notebook deletion
    dispatch({ type: "deleteNoteBook", payLoad: { notebookId } });

    // Dispatch section deletions
    if (sectionsToDelete.length > 0) {
      dispatch({
        type: "deleteSections",
        payLoad: { sectionIds: sectionsToDelete },
      });

      // Dispatch page deletions for each section
      sectionsToDelete.forEach((sectionId) => {
        const pagesToDelete = state.sections.byId[sectionId]?.pageIds || [];
        if (pagesToDelete.length > 0) {
          dispatch({
            type: "deletePages",
            payLoad: { pagesIds: pagesToDelete },
          });
        }
      });
    }
  }

  const notebooks = state.notebooks.allIds.map((id) => {
    const noteBook = state.notebooks.byId[id];
    return (
      <li key={id} className="flex gap-3 items-center">
        <FontAwesomeIcon icon={faBook} className="text-blue-600" />
        <Link to={`/note-project-manager/notebook/${id}`}>
          {noteBook.title}
        </Link>
        <button onClick={() => handleNotebookDeletion(id, state, dispatch)}>
          x
        </button>
      </li>
    );
  });

  console.log(notebooks);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-between pt-8">
      {/* <Outlet /> */}
      <ul className="flex flex-col gap-3 pl-10">{notebooks}</ul>
      <EntityCreator type={"notebook"} />
    </div>
  );
}

export default NoteBooks;
