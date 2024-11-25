import { createPortal } from "react-dom";

function NoFormDialog({
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
      className={`backdrop:bg-stone-900/90 flex justify-center items-center h-52 w-72 bg-slate-800 text-slate-50 rounded-xl  ${
        type === "page" ? "h-72 w-96" : ""
      }`}
    >
      <div className={`flex flex-col gap-6`}>
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
            className="bg-slate-700 text-slate-50 w-64 p-4"
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
          <button onClick={createEntity} type="submit">
            <p className="text-sm">CREATE</p>
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default NoFormDialog;
