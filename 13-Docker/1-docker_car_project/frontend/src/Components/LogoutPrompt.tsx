import { createPortal } from "react-dom";

type LogoutPromptProps = {
  userName: string;
  onClose: () => void;
  onLogout: (userName: string) => void;
};

export default function LogoutPrompt({
  userName,
  onClose,
  onLogout,
}: LogoutPromptProps) {
  return createPortal(
    <>
      <div className="delete-backdrop" />
      <dialog id="delete-modal" open>
        <h2>{userName}</h2>
        <p>
          Are you sure you want to{" "}
          <u>
            <b>LOGOUT</b>
          </u>{" "}
          {userName}?
        </p>
        <p id="delete-actions">
          <button
            className="deleteBtn"
            onClick={() => {
              onLogout(userName);
              onClose();
            }}
          >
            Logout
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
