import { useContext, useState } from "react";
import { Context } from "./ContextProvider";
import { Outlet, useParams, useNavigate } from "react-router-dom";

function Header() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { state } = useContext(Context);
  const { notebookId, sectionId, pageId } = useParams();
  const navigate = useNavigate();

  function handleBacking() {
    navigate(-1);
  }

  let searcher = (
    <div>
      <button onClick={() => setIsSearching(false)}>back</button>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );

  let headerInfo = (
    <span>
      <p>MB</p>
      <h1>ProjeNote</h1>
    </span>
  );

  if (notebookId) {
    headerInfo = (
      <span>
        <button onClick={handleBacking}>back</button>
        <h1>{state.notebooks.byId[notebookId].title}</h1>
      </span>
    );
  }

  if (sectionId) {
    headerInfo = (
      <span>
        <button onClick={handleBacking}>back</button>
        <h1>{state.sections.byId[sectionId].title}</h1>
        <p>{state.notebooks.byId[notebookId].title}</p>
      </span>
    );
  }

  if (pageId) {
    headerInfo = (
      <span>
        <button onClick={handleBacking}>back</button>
        <span>
          <button>undo</button>
          <button>redo</button>
        </span>
      </span>
    );
  }

  return (
    <div>
      <header>
        {isSearching ? (
          searcher
        ) : (
          <>
            {headerInfo}
            <span onClick={() => setIsSearching(true)}>search</span>
          </>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
