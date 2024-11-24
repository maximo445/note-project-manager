import { createPortal } from "react-dom";

function Dialog({
  dialogRef,
  pageBody,
  setPageBody,
  entityName,
  setEntityName,
  createEntity,
  type,
  closeDialog,
}) {
  return createPortal(
    <dialog
      ref={dialogRef}
      className="flex justify-center items-center h-52 w-72 bg-slate-800 text-slate-50 rounded-xl"
    >
      <form className="flex flex-col gap-6" onSubmit={createEntity}>
        <h1>Create a new {type}</h1>
        <input
          className="bg-transparent border-b-2 border-slate-50 pb-1 focus:outline-none focus:ring-0"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder={`${type} name`}
        />
        {type === "page" && (
          <textarea
            value={pageBody}
            onChange={(e) => setPageBody(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder={`${type} name`}
          />
        )}
        <div className="flex justify-end gap-3 w-full ">
          <button onClick={closeDialog} type="button">
            <p className="text-sm">CANCEL</p>
          </button>
          <button onClick={closeDialog} type="submit">
            <p className="text-sm">CREATE</p>
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Dialog;
