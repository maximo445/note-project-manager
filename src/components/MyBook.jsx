import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function MyBook() {
  const { state, dispatch } = useContext(Context);
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const limit = useRef(true);

  useEffect(() => {
    if (state.notebooks.allIds.includes(notebookId) === false) {
      navigate(`/note-project-manager/error`);
    } else {
      limit.current = state.notebooks.byId[notebookId].sectionIds.length < 10;
    }
  }, [notebookId, navigate, state.notebooks.allIds, state, dispatch]);

  function handleSectionDeletion(sectionId, projectId, state, dispatch) {
    const pagesToDelete = state.sections.byId[notebookId]?.pageIds || [];

    // Dispatch notebook deletion
    dispatch({ type: "deleteSection", payLoad: { sectionId, projectId } });

    // Dispatch section deletions
    if (pagesToDelete.length > 0) {
      dispatch({
        type: "deletePages",
        payLoad: { pagesdIds: pagesToDelete },
      });
    }
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
        <button
          onClick={() => handleSectionDeletion(id, notebookId, state, dispatch)}
        >
          x
        </button>
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
        {limit.current ? (
          <EntityCreator type={"section"} />
        ) : (
          <button className="flex justify-center items-center bg-slate-600 w-full p-5 pb-20 sm:pb-5 rounded-t-2xl translate-y-1 text-slate-50">
            Limit of Sections Reached
          </button>
        )}
      </div>
    </div>
  );
}

export default MyBook;
