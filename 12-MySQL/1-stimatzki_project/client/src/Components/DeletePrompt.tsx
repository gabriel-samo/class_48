import axios from "axios";
import { Book } from "../model/book";
import { createPortal } from "react-dom";
import { Dispatch, SetStateAction } from "react";

type DeletePromptProps = {
  bookId: number;
  onClose: () => void;
  onBookDelete: (bookId: number) => void;
};

export default function DeletePrompt({
  bookId,
  onClose,
  onBookDelete
}: DeletePromptProps) {
  return createPortal(
    <>
      <div className="delete-backdrop" />
      <dialog id="delete-modal" open>
        <h2>{bookId}</h2>
        <p>
          Are you sure you want to{" "}
          <u>
            <b>DELETE</b>
          </u>{" "}
          book {bookId}?
        </p>
        <p id="delete-actions">
          <button
            className="deleteBtn"
            onClick={() => {
              onBookDelete(bookId);
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
