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
      <Header></Header>
      <Routes>
        <Route path="/" element={<NoteBooks />} />
        <Route path="/notebook/:id" element={<MyBook />} />
        <Route path="/section/:id" element={<Section />} />
        <Route path="/page/:id" element={<Page />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
