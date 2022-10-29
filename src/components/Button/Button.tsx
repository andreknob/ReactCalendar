import React from "react";

import { IButtonProps } from "./interfaces";

function Button(props: IButtonProps) {
  const { onClick, children } = props;

  return <button onClick={onClick}>{children}</button>;
}

export default Button;
