// ToastCard.tsx
import React from "react";
import "./ToastCard.scss";

interface IAlertType {
  description: string;
  type: string;
  onClose: () => void;
}

const ToastCard: React.FC<IAlertType> = ({ description, type, onClose }) => {
  return (
    <div className={`toast-card ${type}-toast`}>
      <div className="toast-card-content">
        <div className="toast-card-content--right">
          <div>
            <div className="message-text">{type}!</div>
            {description && (
              <div className="description-text">{description}</div>
            )}
          </div>

          <div className="icon icon-times" onClick={onClose}></div>
        </div>
      </div>
    </div>
  );
};

export default ToastCard;
