import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";

function MyBook() {
  const { state } = useContext(Context);
  const { id } = useParams();

  const project = state.notebooks.byId[id];

  const sections = project.sectionIds.map((id) => {
    console.log({ section: id });
    const section = state.sections.byId[id];
    return (
      <Link key={id} to={`/section/${id}`}>
        {section.title}
      </Link>
    );
  });

  return <div>{sections}</div>;
}

export default MyBook;
