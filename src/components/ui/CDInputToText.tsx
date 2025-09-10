import React from "react";

type Props = {
  label?: string;
  value: string | number | undefined;
  edit: boolean;
  name: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

export default function CDInputToText({
  label,
  placeholder,
  value,
  edit,
  name,
  onChange,
  className = "",
}: Props) {
  return (
    <div className={label ? "grid grid-cols-2 w-full" : "w-full"}>
      {label && <div className="px-4 py-2 font-semibold">{label}</div>}
      <div className="px-4 py-2 w-full">
        {edit ? (
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value?.toString() ?? ""}
            onChange={onChange}
            className={`w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${className}`}
          />
        ) : (
          <span>{value || "Not Set"}</span>
        )}
      </div>
    </div>
  );
}
