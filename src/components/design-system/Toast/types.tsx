export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}
