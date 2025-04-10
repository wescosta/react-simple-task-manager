import React from "react";
import type { ConfirmDialogProps } from "./types";
import { Button } from "../Button";

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
