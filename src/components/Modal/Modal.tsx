import React from "react";
import { useDispatch } from "react-redux";

import { closeAllModals } from "../../store/slices/calendarSlice";
import { IModalProps } from "./interfaces";
import { FullScreen, Container, Header, Close } from "./styles";

const Modal: React.FC<IModalProps> = ({
  open,
  title,
  onClose,
  children,
  ...props
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose?.();

    dispatch(closeAllModals());
  };

  return (
    <FullScreen open={open} onClick={handleClose}>
      <Container {...props} title={title} onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{title}</h2>

          <Close onClick={handleClose}>X</Close>
        </Header>

        {children}
      </Container>
    </FullScreen>
  );
};

export default Modal;
