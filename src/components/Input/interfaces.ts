export interface IInputProps {
  name: string;
  value: string;
  width?: string;
  padding?: string;
  setValue: (text: string) => void;
  type?: string;
  color?: string;
  placeholder?: string;
  icon?: React.ReactNode | React.Component;
}

export interface IStyledInputProps {
  width?: string;
  padding?: string;
  color?: string;
  icon?: React.ReactNode | React.Component;
}
