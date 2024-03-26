import ReactDOM from "react-dom";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children, key }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-overlay"),
    key
  );
};

export default Modal;
