export interface IModalProps {
  open: boolean;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export interface IFullScreen {
  open: boolean;
}
