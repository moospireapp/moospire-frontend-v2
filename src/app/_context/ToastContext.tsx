// ToastContext.tsx
import React, { createContext, useContext, useState } from "react";
import { ToastCard } from "@/app/_components";

interface ToastContextProps {
  showToast: (description: string, type: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<{ description: string; type: string }[]>(
    []
  );

  const showToast = (description: string, type: string = "success") => {
    setToasts((prev) => [...prev, { description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <ToastCard
            key={index}
            {...toast}
            onClose={() =>
              setToasts((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
