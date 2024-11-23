import { useContext, useState } from "react";
import { Context } from "./ContextProvider";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import Searcher from "./Searcher";

function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const { state } = useContext(Context);
  const { notebookId, sectionId, pageId } = useParams();
  const navigate = useNavigate();

  function handleBacking() {
    navigate(-1);
  }

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
      <header className="bg-slate-800 text-slate-50">
        {isSearching ? (
          <Searcher handleSetIsSearching={setIsSearching} />
        ) : (
          <>
            {headerInfo}
            {!pageId && (
              <span onClick={() => setIsSearching(true)}>search</span>
            )}
          </>
        )}
      </header>
      {!isSearching && <Outlet />}
    </div>
  );
}

export default Header;
