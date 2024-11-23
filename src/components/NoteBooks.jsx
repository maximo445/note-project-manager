import { useContext } from "react";
import { Context } from "./ContextProvider";
import { Link, Outlet } from "react-router-dom";
import EntityCreator from "./EntityCreator";

function NoteBooks() {
  const { state } = useContext(Context);

  const notebooks = state.notebooks.allIds.map((id) => {
    const noteBook = state.notebooks.byId[id];
    return (
      <Link key={id} to={`/notebook/${id}`}>
        {noteBook.title}
      </Link>
    );
  });

  return (
    <div className="h-screen">
      {/* <Outlet /> */}
      <div>{notebooks}</div>
      <EntityCreator type={"notebook"} />
    </div>
  );
}

export default NoteBooks;
