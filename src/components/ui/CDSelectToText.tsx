import React from "react";

type Option = {
    label: string;
    value: string | number;
};

type Props = {
    label: string;
    value: string | number | undefined;
    edit: boolean;
    name: string;
    options: Option[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function CDSelectToText({
    label,
    value,
    edit,
    name,
    options,
    onChange,
}: Props) {
    return (
        <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">{label}</div>
            <div className="px-4 py-2">
                {edit ? (
                    <select
                        name={name}
                        className="w-full   border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 "
                        value={value ?? ""}
                        onChange={onChange}
                    >
                        <option disabled value="">
                            --- Select {label} ---
                        </option>
                        {options.map((opt, idx) => (
                            <option key={idx} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{value || "Not Set"}</span>
                )}
            </div>
        </div>
    );
}
