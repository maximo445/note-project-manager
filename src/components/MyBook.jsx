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
    <div>
      <h1>my notebook</h1>
      <div>{sections}</div>
      <EntityCreator type={"section"} />
    </div>
  );
}

export default MyBook;
