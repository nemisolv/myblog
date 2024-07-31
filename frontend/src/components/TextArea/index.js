import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({ name = "", type = "text", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative w-full">
      <textarea
        id={name}
        type={type}
        {...field}
        {...props}
        className="w-full p-4 bg-transparent border-2 border-gray-f1 rounded-lg transition-all duration-200 linear text-black text-base resize-none min-h-40"
      />
    </div>
  );
};

export default Textarea;
