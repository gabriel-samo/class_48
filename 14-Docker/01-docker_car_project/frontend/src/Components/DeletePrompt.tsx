import { createPortal } from "react-dom";

type DeletePromptProps = {
  carNumber: number;
  onClose: () => void;
  onCarDelete: (carNumber: number) => void;
};

export default function DeletePrompt({
  carNumber,
  onClose,
  onCarDelete,
}: DeletePromptProps) {
  return createPortal(
    <>
      <div className="delete-backdrop" />
      <dialog id="delete-modal" open>
        <h2>{carNumber}</h2>
        <p>
          Are you sure you want to{" "}
          <u>
            <b>DELETE</b>
          </u>{" "}
          car {carNumber}?
        </p>
        <p id="delete-actions">
          <button
            className="deleteBtn"
            onClick={() => {
              onCarDelete(carNumber);
              onClose();
            }}
          >
            Delete
          </button>
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
        </p>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
