import { Routes, Route } from "react-router-dom";
import ContextProvider from "./components/ContextProvider";
import Header from "./components/Header";
import NoteBooks from "./components/NoteBooks";
import MyBook from "./components/MyBook";
import Section from "./components/Section";
import Page from "./components/Page";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<NoteBooks />} />
          <Route path="notebook/:notebookId" element={<MyBook />} />
          <Route
            path="notebook/:notebookId/section/:sectionId/"
            element={<Section />}
          />
          <Route
            path="notebook/:notebookId/section/:sectionId/page/:pageId"
            element={<Page />}
          />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
