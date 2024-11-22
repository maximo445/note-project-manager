import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextProvider";

function Page() {
  const { state } = useContext(Context);
  const { pageId } = useParams();

  const page = state.pages.byId[pageId];

  console.log({ pageId, page });

  return (
    <div>
      <h1>{page.title}</h1>
      <h5>{page.createdAt}</h5>
      <p>{page.body}</p>
    </div>
  );
}

export default Page;
