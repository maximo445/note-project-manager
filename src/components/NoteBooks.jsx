import { useContext } from "react";
import { Context } from "./ContextProvider";
import { Link } from "react-router-dom";

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

  return <div>{notebooks}</div>;
}

export default NoteBooks;
