import { useContext, useState } from "react";
import { Context } from "./ContextProvider";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import Searcher from "./Searcher";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useContext(Context);
  const { notebookId, sectionId, pageId } = useParams();
  const navigate = useNavigate();

  function handleBacking() {
    navigate(-1);
  }

  function closeSearch() {
    setIsSearching(false);
    setSearchResults([]);
  }

  let headerInfo = (
    <span className="flex justify-between gap-6">
      <p>MB</p>
      <h1>ProjeNote</h1>
    </span>
  );

  if (notebookId) {
    headerInfo = (
      <span className="flex gap-2.5 justify-center items-center">
        <button className="text-3xl" onClick={handleBacking}>
          {"<"}
        </button>
        <h1 className="text-2xl">{state.notebooks.byId[notebookId].title}</h1>
      </span>
    );
  }

  if (sectionId) {
    headerInfo = (
      <span>
        <div className="flex gap-5">
          <button className="text-3xl" onClick={handleBacking}>
            {"<"}
          </button>
          <div>
            <h1 className="text-2xl">{state.sections.byId[sectionId].title}</h1>
            <p className="text-xs text-slate-500">
              {state.notebooks.byId[notebookId].title}
            </p>
          </div>
        </div>
      </span>
    );
  }

  if (pageId) {
    headerInfo = (
      <span className="flex justify-between w-full">
        <button className="text-3xl" onClick={handleBacking}>
          {"<"}
        </button>
        <span className="flex gap-4">
          <button>undo</button>
          <button>redo</button>
        </span>
      </span>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center h-20 py-5 px-10 bg-slate-800 text-slate-50">
        {isSearching ? (
          <Searcher
            handleSetIsSearching={closeSearch}
            handleSetSearchResults={setSearchResults}
          />
        ) : (
          <>
            {headerInfo}
            {!pageId && (
              <span onClick={() => setIsSearching(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            )}
          </>
        )}
      </header>
      {!isSearching && <Outlet />}
      {isSearching && (
        <div className="h-[calc(100vh-100px)] flex flex-col justify-between pt-8 bg-slate-800 text-slate-50">
          <ul className="pl-10">{searchResults}</ul>
        </div>
      )}
    </div>
  );
}

export default Header;
