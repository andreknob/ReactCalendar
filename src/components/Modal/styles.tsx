import styled from "styled-components";

import { IFullScreen } from "./interfaces";

export const FullScreen = styled.div<IFullScreen>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeModal 380ms ease-in-out 1;
  @keyframes fadeIn {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  animation: slideIn 350ms cubic-bezier(0.42, 0, 0.21, 1) 1;
  @keyframes slideIn {
    from {
      transform: translateY(-120px);
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  h2 {
    flex: 1;
    margin-bottom: 0;
  }
`;

export const Close = styled.button`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  border: 0;
  font-size: 16px;
  &:hover {
    color: black;
  }
`;
