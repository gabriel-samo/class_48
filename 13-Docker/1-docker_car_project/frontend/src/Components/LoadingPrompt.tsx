import { createPortal } from "react-dom";

type LoadingPromptProps = {
  onClose: () => void;
};

export default function LoadingPrompt({ onClose }: LoadingPromptProps) {
  return createPortal(
    <>
      <div className="delete-backdrop" />
      <dialog id="delete-modal" open>
        <h2 className="mb-0">Loading...</h2>
        <div id="mySpinner" className="spinner"></div>
        <p id="delete-actions"></p>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
