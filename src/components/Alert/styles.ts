import styled, { css } from "styled-components";

export const AlertWrapper = styled.div<{ color: string }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  color: #fff;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  ${({ color }) =>
    css`
      border: 1px solid ${color};
    `}
`;