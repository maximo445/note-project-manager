import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Section() {
  const { state, dispatch } = useContext(Context);
  const { sectionId, notebookId } = useParams();
  const navigate = useNavigate();

  function goHome() {
    navigate("/note-project-manager");
  }

  if (
    !state.sections.allIds.includes(sectionId) ||
    !state.notebooks.allIds.includes(notebookId)
  ) {
    navigate("*");
    return (
      <div>
        <h1>
          There is no such section:{" "}
          <span>{`notebook/${notebookId}/section/${sectionId}`}</span>
        </h1>
        <button onClick={goHome}>back</button>
      </div>
    );
  }

  const limit = state.sections.byId[sectionId].pageIds.length < 10;

  const section = state.sections.byId[sectionId];

  const pages = section.pageIds.map((id) => {
    const page = state.pages.byId[id];
    return (
      <li key={id} className="flex gap-3 items-center">
        <FontAwesomeIcon icon={faFile} className="text-slate-600" />
        <Link
          to={`/note-project-manager/notebook/${notebookId}/section/${sectionId}/page/${id}`}
        >
          {page.title}
        </Link>
        <button
          onClick={() =>
            dispatch({ type: "deletePage", payload: { pageId: id, sectionId } })
          }
        >
          x
        </button>
      </li>
    );
  });

  console.log(section.title);

  return (
    <div>
      <div>
        <p className="pl-10 pt-1">PAGES</p>
      </div>
      <div className="h-[calc(100vh-114px)] flex flex-col justify-between pt-8">
        <ul className="flex flex-col gap-3 pl-10">{pages}</ul>
        {limit ? (
          <EntityCreator type={"page"} />
        ) : (
          <button className="flex justify-center items-center bg-slate-600 w-full p-5 pb-20 sm:pb-5 rounded-t-2xl translate-y-1 text-slate-50">
            Limit of Pages Reached
          </button>
        )}
      </div>
    </div>
  );
}

export default Section;
