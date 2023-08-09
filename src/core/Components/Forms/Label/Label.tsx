import React from "react";
import clsx from "clsx";

/* import interfaces */
import { BaseProps } from "../../../models/common/BaseProps.Interface";

export default function Label({ className, children }: BaseProps) {
  return (
    <span className={clsx("custom-label", "capitalize", className)}>
      {children}
    </span>
  );
}
