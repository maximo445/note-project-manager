import { createContext, useReducer } from "react";

export const Context = createContext();

// { title: entityName, id: nanoid(), sectionIds: [] }

const reducer = (state, action) => {
  switch (action.type) {
    case "addNotebook":
      return {
        ...state,
        notebooks: {
          byId: {
            ...state.notebooks.byId,
            [action.payLoad.id]: action.payLoad,
          },
          allIds: [...state.notebooks.allIds, action.payLoad.id],
        },
      };
    case "addSection":
      return {
        ...state,
        notebooks: {
          byId: {
            ...state.notebooks.byId,
            [action.payLoad.notebookId]: {
              ...state.notebooks.byId[action.payLoad.notebookId],
              sectionIds: [
                ...state.notebooks.byId[action.payLoad.notebookId].sectionIds,
                action.payLoad.section.id,
              ],
            },
          },
          allIds: [...state.notebooks.allIds, action.payLoad.id],
        },
        sections: {
          byId: {
            ...state.sections.byId,
            [action.payLoad.section.id]: action.payLoad.section,
          },
          allIds: [...state.sections.allIds, action.payLoad.section.id],
        },
      };
  }
};

const initialState = {
  notebooks: {
    byId: {
      987: {
        id: 987,
        title: "tempNoteBook",
        sectionIds: [123], // References to sections
      },
    },
    allIds: [987], // Keeps track of all notebook IDs
  },
  sections: {
    byId: {
      123: {
        id: 123,
        title: "testSection",
        pageIds: [456], // References to pages
      },
    },
    allIds: [123], // Keeps track of all section IDs
  },
  pages: {
    byId: {
      456: {
        id: 456,
        title: "tempPage",
        createdAt: "11/18/2024",
        body: "My first publication. Lorem Ipsum. I dont beleive in defeat!",
      },
    },
    allIds: [456], // Keeps track of all page IDs
  },
};

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default ContextProvider;
