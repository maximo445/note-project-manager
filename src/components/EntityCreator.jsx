import { useContext, useState, useRef } from "react";
import { Context } from "./ContextProvider";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function EntityCreator({ type }) {
  const { dispatch } = useContext(Context);
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogRef.current?.close();
  };

  const createEntity = (e) => {
    e.preventDefault();
    if (type === "notebook") {
      // continue here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      dispatch({ type: "addNotebook", payload: {} });
    }
  };

  if (type === "no-prop") <div>No props passed...</div>;

  return (
    <div>
      <button onClick={openDialog}>+ {type}</button>
      <dialog ref={dialogRef}>
        <form action="">
          <h1>Create a new {type}</h1>
          <input type="text" name="" id="" placeholder="Notebook name" />
          <button onClick={closeDialog} type="submit">
            CREATE
          </button>
        </form>
      </dialog>
    </div>
  );
}

EntityCreator.propTypes = {
  type: PropTypes.string.isRequired,
};

EntityCreator.defaultProps = {
  type: "no-prop",
};

export default EntityCreator;
