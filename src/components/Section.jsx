import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Section() {
  const { state } = useContext(Context);
  const { sectionId, notebookId } = useParams();

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
        <EntityCreator type="page" />
      </div>
    </div>
  );
}

export default Section;
