import {css, styled} from "@mui/system";
import {Modal as BaseModal} from "@mui/base/Modal/Modal";
import React from "react";
import clsx from "clsx";

const Backdrop = React.forwardRef<HTMLDivElement,
    { open?: boolean; className: string }>((props, ref) => {
    const {open, className, ...other} = props;
    return (
        <div
            className={clsx({'MuiBackdrop-open': open}, className)}
            ref={ref}
            {...other}
        />
    );
});

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const ModalContent = styled('div')(
    () => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: #424242;
      border-radius: 8px;
      border: 2px solid #152944;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.5);
      padding: 24px;
      color: #F3F6F9;
      max-height: 90vh;
      overflow-y: auto;
    `,
);