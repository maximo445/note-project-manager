import { Routes, Route } from "react-router-dom";
import ContextProvider from "./components/ContextProvider";
import Header from "./components/Header";
import NoteBooks from "./components/NoteBooks";
import MyBook from "./components/MyBook";
import Section from "./components/Section";
import Page from "./components/Page";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ContextProvider>
      {/* <HashRouter> */}
      <Routes>
        <Route path="/note-project-manager" element={<Header />}>
          <Route index element={<NoteBooks />} />
          <Route path="notebook/:notebookId" element={<MyBook />} />
          <Route
            path="notebook/:notebookId/section/:sectionId/"
            element={<Section />}
          />
          <Route
            path="notebook/:notebookId/section/:sectionId/page/:pageId"
            element={<Page />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="error" element={<NotFound />} />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
