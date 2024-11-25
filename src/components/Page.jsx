import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";

function Page() {
  const { state } = useContext(Context);
  const { pageId } = useParams();

  const navigate = useNavigate();

  function goHome() {
    navigate("/note-project-manager");
  }

  if (!state.pages.allIds.includes(pageId)) {
    return (
      <div>
        <h1>
          There is no page with id: <span>{pageId}</span>
        </h1>
        <button onClick={goHome}>back</button>
      </div>
    );
  }

  const page = state.pages.byId[pageId];

  console.log({ pageId, page });

  return (
    <div className="bg-slate-700 text-slate-100 h-[calc(100vh-80px)] pl-3 pt-3">
      <h1 className="text-3xl mb-1">{page.title}</h1>
      <hr></hr>
      <p className="text-xs">{page.createdAt}</p>
      <p className="mt-3">{page.body}</p>
    </div>
  );
}

export default Page;
