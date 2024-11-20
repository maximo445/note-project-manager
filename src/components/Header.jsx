import { useContext } from "react";
import { Context } from "./ContextProvider";

function Header() {
  const { state } = useContext(Context);

  console.log(state.notebooks);

  return (
    <div>
      <h1>Comming Soon</h1>
    </div>
  );
}

export default Header;
