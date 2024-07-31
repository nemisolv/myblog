import React from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative mt-4 inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;