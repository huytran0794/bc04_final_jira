import React from "react";

// import antd components
import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { generalActions } from "../../redux/slice/generalSlice";

export default function GeneralDrawer() {
  let dispatch = useAppDispatch();

  let { isDrawerOpen, DrawerContent } = useAppSelector(
    (state) => state.generalReducer
  );

  const onClose = () => {
    dispatch(generalActions.closeDrawer());
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={isDrawerOpen}
      key="right"
      size="large"
    >
      {DrawerContent}
    </Drawer>
  );
}
