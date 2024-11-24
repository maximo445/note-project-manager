import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";
import EntityCreator from "./EntityCreator";

function MyBook() {
  const { state } = useContext(Context);
  const { notebookId } = useParams();

  const project = state.notebooks.byId[notebookId];

  const sections = project.sectionIds.map((id) => {
    const section = state.sections.byId[id];
    return (
      <Link key={id} to={`/notebook/${notebookId}/section/${id}`}>
        {section.title}
      </Link>
    );
  });

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-between pt-8">
      <div className="flex flex-col gap-3 pl-10">{sections}</div>
      <EntityCreator type={"section"} />
    </div>
  );
}

export default MyBook;
