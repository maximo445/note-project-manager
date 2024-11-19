import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";

function Section() {
  const { state } = useContext(Context);
  const { id } = useParams();

  const section = state.sections.byId[id];

  const pages = section.pageIds.map((id) => {
    const page = state.pages.byId[id];
    return (
      <Link key={id} to={`/page/${id}`}>
        {page.title}
      </Link>
    );
  });

  console.log(section);

  return <div>{pages}</div>;
}

export default Section;
