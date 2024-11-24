import { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./ContextProvider";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import NoFormDialog from "./NoFormDialog";

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function EntityCreator({ type }) {
  const { dispatch } = useContext(Context);
  const params = useParams();
  const dialogRef = useRef(null);

  const [entityName, setEntityName] = useState("");
  const [pageBody, setPageBody] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(() => true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setIsDialogOpen(() => false);
  };

  const createEntity = () => {
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
    if (type === "page") {
      if (!params?.sectionId) return;

      const date = new Date();
      const dateFormated = formatDate(date);

      dispatch({
        type: "addPage",
        payLoad: {
          page: {
            id: nanoid(),
            title: entityName,
            createdAt: dateFormated,
            body: pageBody,
            pageIds: [],
          },
          sectionId: params.sectionId,
        },
      });
    }
    setIsDialogOpen(() => false);
    setEntityName("");
    setPageBody("");
    setTimeout(() => {
      dialogRef.current?.close();
    }, 0);
  };

  if (type === "no-prop") <div>No props passed...</div>;

  return (
    <div>
      <button
        className="flex bg-slate-600 w-screen p-5 rounded-t-2xl translate-y-1 text-slate-50"
        onClick={openDialog}
      >
        + {type}
      </button>

      {isDialogOpen && (
        <NoFormDialog
          dialogRef={dialogRef}
          pageBody={pageBody}
          setPageBody={setPageBody}
          entityName={entityName}
          setEntityName={setEntityName}
          createEntity={createEntity}
          type={type}
          closeDialog={closeDialog}
        />
      )}
    </div>
  );
}

EntityCreator.propTypes = {
  type: PropTypes.string.isRequired,
};

export default EntityCreator;
