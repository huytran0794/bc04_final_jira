/* import antd components */
import { Modal } from "antd";
import { FormInstance } from "antd/es/form/Form";
import React, { useEffect, useRef } from "react";

/* import redux */
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { modalActions } from "../../redux/slice/modalSlice";


const ModalComponent = () => {
  let dispatch = useAppDispatch();
  let { open, modalContent, headerContent, width, form } = useAppSelector(
    (state) => state.modalReducer.modalProps
  );
  const onCancel = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      title={headerContent || "Modal"}
      centered
      closable={true}
      open={open}
      onOk={() => {
        console.log("Ok");
      }}
      onCancel={onCancel}
      width={width}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {modalContent}
    </Modal>
  );
};

export default ModalComponent;
