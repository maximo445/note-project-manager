import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ContextProvider";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircle, faFile } from "@fortawesome/free-solid-svg-icons";

function Searcher({ handleSetIsSearching, handleSetSearchResults }) {
  const [query, setQuery] = useState("");
  const { state } = useContext(Context);
  const navigate = useNavigate();

  const goToSearchedItem = useCallback(
    (destination) => {
      console.log(destination);
      handleSetIsSearching();
      setQuery("");
      handleSetSearchResults([]);
      navigate(destination);
    },
    [handleSetIsSearching, handleSetSearchResults, navigate]
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
        <li className="flex items-center gap-3" key={id}>
          <FontAwesomeIcon icon={faBook} className="text-blue-600" />
          <button
            onClick={() =>
              goToSearchedItem(`/note-project-manager/notebook/${id}`)
            }
          >
            {notebooks.byId[id]?.title || "Untitle Notebook"}
          </button>
        </li>
      ));

      const sectionLinks = sectionsIds.map((sectionId) => {
        // Filter notebooks to find the one containing the current sectionId
        const noteBookId = notebooks.allIds.filter((id) => {
          return notebooks.byId[id].sectionIds.includes(sectionId);
        });

        // Ensure noteBookId has at least one element
        if (noteBookId.length === 0) {
          console.error(`No notebook found for sectionId: ${sectionId}`);
          return null; // Return null or handle error appropriately
        }

        return (
          <li
            className="flex items-center gap-3"
            key={`${noteBookId[0]}-${sectionId}`}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-yellow-500"
            ></FontAwesomeIcon>
            <button
              onClick={() =>
                goToSearchedItem(
                  `/note-project-manager/notebook/${noteBookId[0]}/section/${sectionId}`
                )
              }
            >
              {sections.byId[sectionId]?.title || "Untitled Section"}
            </button>
          </li>
        );
      });

      const pageLinks = pagesIds.map((pageId) => {
        // Filter sections to find the one containing the current sectionId
        const sectionId = sections.allIds.filter((id) => {
          return sections.byId[id].pageIds.includes(pageId);
        });

        // Ensure noteBookId has at least one element
        if (sectionId.length === 0) {
          console.error(`No page found for sectionId: ${sectionId}`);
          return null; // Return null or handle error appropriately
        }

        const noteBookId = notebooks.allIds.filter((id) => {
          return notebooks.byId[id].sectionIds.includes(sectionId[0]);
        });

        if (noteBookId.length === 0) {
          console.error(`No page found for sectionId: ${sectionId}`);
          return null; // Return null or handle error appropriately
        }

        return (
          <li
            className="flex items-center gap-3"
            key={`${sectionId[0]}-${pageId}`}
          >
            <FontAwesomeIcon
              icon={faFile}
              className="text-slate-600"
            ></FontAwesomeIcon>
            <button
              onClick={() =>
                goToSearchedItem(
                  `/note-project-manager/notebook/${noteBookId[0]}/section/${sectionId}/page/${pageId}`
                )
              }
            >
              {pages.byId[pageId]?.title || "Untitled Page"}
            </button>
          </li>
        );
      });

      query.length > 0
        ? handleSetSearchResults([
            ...notebookLinks,
            ...sectionLinks,
            ...pageLinks,
          ])
        : handleSetSearchResults([]);
    }
    processQuery();
  }, [query, state]);

  return (
    <div>
      <div className="flex gap-5">
        <button onClick={() => handleSetIsSearching()}>back</button>
        <input
          className="bg-transparent focus:outline-none focus:ring-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

Searcher.propTypes = {
  handleSetIsSearching: PropTypes.func.isRequired,
  handleSetSearchResults: PropTypes.func.isRequired,
};

export default Searcher;
