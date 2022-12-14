export interface IInputProps {
  name: string;
  value: string;
  width?: string;
  margin?: string;
  padding?: string;
  setValue: (text: string) => void;
  type?: string;
  onBlur?: () => void;
  color?: string;
  placeholder?: string;
  icon?: React.ReactNode | React.Component;
}

export interface IStyledInputProps {
  width?: string;
  margin?: string;
  padding?: string;
  color?: string;
  icon?: React.ReactNode | React.Component;
}
