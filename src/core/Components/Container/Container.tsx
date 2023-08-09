import clsx from "clsx";
import React from "react";

/* import local interface */
import { BaseProps } from "../../models/common/BaseProps.Interface";

const Container = ({ className, children }: BaseProps) => {
  return (
    <div className={clsx("container mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
