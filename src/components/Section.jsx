import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

function Section() {
  const { state } = useContext(Context);
  const { sectionId, notebookId } = useParams();

  const section = state.sections.byId[sectionId];

  const pages = section.pageIds.map((id) => {
    const page = state.pages.byId[id];
    return (
      <Link
        key={id}
        to={`/notebook/${notebookId}/section/${sectionId}/page/${id}`}
      >
        {page.title}
      </Link>
    );
  });

  console.log(section.title);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-between pt-8">
      <div className="flex flex-col gap-3 pl-10">{pages}</div>
      <EntityCreator type="page" />
    </div>
  );
}

export default Section;
