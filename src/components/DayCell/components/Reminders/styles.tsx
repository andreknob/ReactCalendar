import styled from "styled-components";

import { COLORS } from "../../../../constants";

export const RemindersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReminderContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 8px 8px 8px 24px;
  border-radius: 4px;

  &:after {
    content: "";
    background-color: ${COLORS.PURPLE};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 13px;
    left: 8px;

    animation: pulse 2s linear infinite;
  }

  &:hover {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Date = styled.span`
  color: gray;
`;
