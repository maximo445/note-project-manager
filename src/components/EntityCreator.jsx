import { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./ContextProvider";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function EntityCreator({ type }) {
  const { dispatch } = useContext(Context);

  const params = useParams();

  const dialogRef = useRef(null);

  const [entityName, setEntityName] = useState("");
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
    if (!entityName) return;
    if (type === "notebook") {
      dispatch({
        type: "addNotebook",
        payLoad: { title: entityName, id: nanoid(), sectionIds: [] },
      });

      setEntityName("");
    }
    if (type === "section") {
      if (!params?.notebookId) return;
      dispatch({
        type: "addSection",
        payLoad: {
          section: { title: entityName, id: nanoid(), pageIds: [] },
          notebookId: params.notebookId,
        },
      });

      setEntityName("");
    }
  };

  if (type === "no-prop") <div>No props passed...</div>;

  return (
    <div>
      <button onClick={openDialog}>+ {type}</button>
      <dialog ref={dialogRef}>
        <form onSubmit={createEntity}>
          <h1>Create a new {type}</h1>
          <input
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder={`${type} name`}
          />
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

export default EntityCreator;
