import React, { useState, ReactNode, FC } from "react";
import { Modal, message } from "antd";

export interface IConfirmationModal {
  visible: boolean;
  onOk: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
  message: string;
}

const CConfirmationModal: FC<IConfirmationModal> = ({
  visible,
  onOk,
  onCancel,
  title,
  message,
}) => {
  const [visibleModal, visibleModalChange] = useState<boolean>(visible);
  return (
    <Modal
      title={title}
      visible={visibleModal}
      onOk={onOk}
      onCancel={(event) => {
        if (onCancel) {
          onCancel(event);
        }
        visibleModalChange(false);
      }}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default CConfirmationModal;
