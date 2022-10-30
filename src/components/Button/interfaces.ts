export interface IButtonProps {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  margin?: string;
  showBorder?: boolean;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[] | string;
}
