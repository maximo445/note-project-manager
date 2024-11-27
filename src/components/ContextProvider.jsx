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
    case "deleteNoteBook": {
      const id = action.payLoad.notebookId;

      // const sectionsToDelete = state.byId[id]?.sectionIds || [];

      delete state.byId[id];
      const indextToRemove = state.allIds.indexOf(id);
      if (indextToRemove !== -1) {
        state.allIds.splice(indextToRemove, 1);
      }
      break;
    }
    case "deleteSection":
      {
        const { sectionId, projectId } = action.payLoad;
        // const pagesToDelete = state.byId[sectionId].pageIds || [];

        const indexToRemove =
          state.byId[projectId].sectionIds.indexOf(sectionId);

        if (indexToRemove !== -1) {
          state.byId[projectId].sectionIds.splice(indexToRemove, 1);
        }
      }
      break;

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
    case "deleteSections":
      {
        const { sectionIds } = action.payLoad;
        sectionIds.forEach((sectionId) => {
          // const pagesToDelete = state.byId[sectionId].pageIds || [];

          delete state.byId[sectionId];
          const indexToRemove = state.allIds.indexOf(sectionId);
          if (indexToRemove !== -1) {
            state.allIds.splice(sindexToRemove, 1);
          }

          // action.dispatch({
          //   type: "deletePages",
          //   payLoad: { pagesIds: pagesToDelete },
          // });
        });
      }
      break;
    case "deletePage":
      {
        const { pageId, sectionId } = action.payload;
        const indexToRemove = state.byId[sectionId].pageIds.indexOf(pageId);
        if (indexToRemove !== -1) {
          state.byId[sectionId].pageIds.splice(indexToRemove, 1);
        }
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
    case "deletePages":
      {
        const { pagesIds } = action.payLoad;
        pagesIds.forEach((pageId) => {
          delete state.byId[pageId];
          const indexToRemove = state.allIds.indexOf(pageId);
          if (indexToRemove !== -1) {
            state.allIds.splice(indexToRemove, 1);
          }
        });
      }
      break;
    case "deletePage":
      {
        const { pageId } = action.payload;
        delete state.byId[pageId];
      }
      break;
    default:
      break;
  }
});

const rootReducer = (state, action) => ({
  notebooks: notebooksReducer(state.notebooks, {
    ...action,
    dispatch: action.dispatch,
  }),
  sections: sectionsReducer(state.sections, {
    ...action,
    dispatch: action.dispatch,
  }),
  pages: pagesReducer(state.pages, action),
});

const localStorageState = localStorage.getItem("state");

if (!localStorageState)
  localStorage.setItem(
    "state",
    JSON.stringify({
      notebooks: {
        byId: {
          // 987: {
          //   id: "987",
          //   title: "tempNoteBook",
          //   sectionIds: ["123"], // References to sections
          // },
        },
        allIds: [], // Keeps track of all notebook IDs 987
      },
      sections: {
        byId: {
          // 123: {
          //   id: "123",
          //   title: "testSection",
          //   pageIds: ["456"], // References to pages
          // },
        },
        allIds: [], // Keeps track of all section IDs 123
      },
      pages: {
        byId: {
          // 456: {
          //   id: "456",
          //   title: "tempPage",
          //   createdAt: "11/18/2024",
          //   body: "My first publication. Lorem Ipsum. I dont beleive in defeat!",
          // },
        },
        allIds: [], // Keeps track of all page IDs 456
      },
    })
  );

const initialState = JSON.parse(localStorage.getItem("state"));

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
