import React from "react";
import styles from "./modal-overlay.module.css";
import { ModalOverlayProps } from "./modal-overlay.types";

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
