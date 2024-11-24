import { createContext, useEffect, useReducer } from "react";

import { produce } from "immer";

export const Context = createContext();

const notebooksReducer = produce((state, action) => {
  switch (action.type) {
    case "addNotebook":
      state.byId[action.payLoad.id] = action.payLoad;
      state.allIds.push(action.payLoad.id);
      break;
    case "addSection": {
      const { notebookId, section } = action.payLoad;
      state.byId[notebookId].sectionIds.push(section.id);
      break;
    }
    default:
      break;
  }
});

const sectionsReducer = produce((state, action) => {
  switch (action.type) {
    case "addSection":
      state.byId[action.payLoad.section.id] = action.payLoad.section;
      state.allIds.push(action.payLoad.section.id);
      break;
    case "addPage":
      {
        const { sectionId, page } = action.payLoad;
        state.byId[sectionId].pageIds.push(page.id);
      }
      break;
    default:
      break;
  }
});

const pagesReducer = produce((state, action) => {
  switch (action.type) {
    case "addPage":
      state.byId[action.payLoad.page.id] = action.payLoad.page;
      state.allIds.push(action.payLoad.page.id);
      break;
    default:
      break;
  }
});

const rootReducer = (state, action) => ({
  notebooks: notebooksReducer(state.notebooks, action),
  sections: sectionsReducer(state.sections, action),
  pages: pagesReducer(state.pages, action),
});

let initialState = null;

const localStorageState = localStorage.getItem("state");

!localStorageState
  ? (initialState = {
      notebooks: {
        byId: {
          987: {
            id: "987",
            title: "tempNoteBook",
            sectionIds: ["123"], // References to sections
          },
        },
        allIds: ["987"], // Keeps track of all notebook IDs
      },
      sections: {
        byId: {
          123: {
            id: "123",
            title: "testSection",
            pageIds: ["456"], // References to pages
          },
        },
        allIds: ["123"], // Keeps track of all section IDs
      },
      pages: {
        byId: {
          456: {
            id: "456",
            title: "tempPage",
            createdAt: "11/18/2024",
            body: "My first publication. Lorem Ipsum. I dont beleive in defeat!",
          },
        },
        allIds: [456], // Keeps track of all page IDs
      },
    })
  : (initialState = JSON.parse(localStorageState));

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default ContextProvider;
