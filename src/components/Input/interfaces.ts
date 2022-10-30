export interface IInputProps {
  name: string;
  value: string;
  setValue: (text: string) => void;
  type?: string;
  color?: string;
  placeholder?: string;
  icon?: React.ReactNode | React.Component;
}

export interface IInputLabelProps {
  icon?: React.ReactNode | React.Component;
}
