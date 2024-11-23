import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ContextProvider";
import PropTypes from "prop-types";

function Searcher({ handleSetIsSearching }) {
  const [query, setQuery] = useState("");
  const { state } = useContext(Context);
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const goToSearchedItem = useCallback(
    (destination) => {
      handleSetIsSearching(false);
      setQuery("");
      navigate(destination);
    },
    [handleSetIsSearching, navigate, setQuery]
  );

  useEffect(() => {
    const notebooks = state.notebooks;
    const sections = state.sections;
    const pages = state.pages;

    function processQuery() {
      const notebooksIds = notebooks.allIds.filter((id) =>
        notebooks.byId[id].title.toLowerCase().includes(query.toLowerCase())
      );

      const sectionsIds = sections.allIds.filter((id) =>
        sections.byId[id].title.toLowerCase().includes(query.toLowerCase())
      );

      const pagesIds = pages.allIds.filter((id) =>
        pages.byId[id].title.toLowerCase().includes(query.toLowerCase())
      );

      const notebookLinks = notebooksIds.map((id) => (
        <button key={id} onClick={() => goToSearchedItem(`/notebook/${id}`)}>
          {notebooks.byId[id]?.title || "Untitle Notebook"}
        </button>
      ));

      const sectionLinks = sectionsIds.map((sectionId) => {
        // Filter notebooks to find the one containing the current sectionId
        const noteBookId = notebooks.allIds.filter((id) => {
          console.log({ myNoteBook: notebooks.byId[id] });
          return notebooks.byId[id].sectionIds.includes(sectionId);
        });

        // Ensure noteBookId has at least one element
        if (noteBookId.length === 0) {
          console.error(`No notebook found for sectionId: ${sectionId}`);
          return null; // Return null or handle error appropriately
        }

        return (
          <button
            key={`${noteBookId[0]}-${sectionId}`}
            onClick={() =>
              goToSearchedItem(
                `/notebook/${noteBookId[0]}/section/${sectionId}`
              )
            }
          >
            {sections.byId[sectionId]?.title || "Untitled Section"}
          </button>
        );
      });

      console.log({ notebooksIds, sectionsIds, pagesIds });
      console.log({ notebookLinks });

      return [...notebookLinks, ...sectionLinks];
    }
    if (query.length >= 1) setSearchResults(processQuery());
  }, [
    goToSearchedItem,
    handleSetIsSearching,
    query,
    setSearchResults,
    state.notebooks,
    state.notebooks.allIds,
    state.notebooks.byId,
    state.pages,
    state.sections,
  ]);

  return (
    <div>
      <div>
        <button onClick={() => handleSetIsSearching(false)}>back</button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
      </div>
      {searchResults}
    </div>
  );
}

Searcher.propTypes = {
  handleSetIsSearching: PropTypes.func.isRequired,
};

export default Searcher;
