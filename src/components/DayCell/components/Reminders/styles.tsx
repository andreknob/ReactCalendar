import styled from "styled-components";

import { COLORS } from "../../../../constants";

export const RemindersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReminderContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 4px 8px 4px 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &:after {
    content: "";
    background-color: ${COLORS.PURPLE};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 9px;
    left: 8px;

    animation: pulse 2s linear infinite;
  }

  &:hover {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`;

export const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Name = styled.span`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Date = styled.span`
  color: gray;
`;

export const Forecast = styled.div`
  color: ${COLORS.PURPLE};
  font-size: 10px;
`;
