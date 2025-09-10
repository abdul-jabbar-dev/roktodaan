import API from '@/api';
import { Check, KeyRound, Pencil } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ChangePassword = () => {
    const [edit, setEdit] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // auto clear message after 3s
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function validatePassword(password: string): string[] {
        const errors: string[] = [];
        if (password.length < 8) errors.push("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে");
        return errors;
    }

    const handlePasswordChange = (value: string) => {
        setNewPassword(value);
        setPasswordErrors(validatePassword(value));
        if (confirmPassword && value !== confirmPassword) {
            setMessage({ type: "error", text: "Password এবং Confirm Password মিলছে না" });
        } else {
            setMessage(null);
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (newPassword !== value) {
            setMessage({ type: "error", text: "Password মিলছে না" });
        } else {
            setMessage(null);
        }
    };

    const setPassword = async () => {
        setMessage(null);

        const errors = validatePassword(newPassword);
        if (errors.length > 0) {
            setPasswordErrors(errors);
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Password এবং Confirm Password মিলছে না" });
            return;
        }

        try {
            const res = await API.user.updatePassword(newPassword);
            if (res.data.status) {
                setNewPassword("");
                setConfirmPassword("");
                setEdit(false);
                setPasswordErrors([]);
                setMessage({ type: "success", text: "Password পরিবর্তন হয়েছে ✅" });
            } else {
                setMessage({ type: "error", text: "Password পরিবর্তন ব্যর্থ ❌" });
            }
        } catch {
            setMessage({ type: "error", text: "Password পরিবর্তন ব্যর্থ ❌" });
        }
    };

    return (
        <div className="bg-white p-3 shadow-sm rounded-xl relative">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-gray-500">
                    <KeyRound className="h-[16px]" />
                </span>
                <span className="tracking-wide">Password</span>
            </div>

            <div className="text-gray-700 ml-1">
                <div className="flex items-center text-sm">
                    {/* New Password */}
                    <div className="grid grid-cols-2 w-full">
                        <div className="px-4 py-2 font-semibold">New Password</div>
                        <div className="px-4 py-2 w-full">
                            <input
                                disabled={!edit}
                                type="password"
                                value={newPassword}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            {passwordErrors.length > 0 && (
                                <ul className="mt-2 space-y-1 text-red-500 text-sm">
                                    {passwordErrors.map((err, idx) => (
                                        <li key={idx}>⚠ {err}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="grid grid-cols-2 w-full">
                        <div className="px-4 py-2 font-semibold">Re-Type Password</div>
                        <div className="px-4 py-2 w-full">
                            <input
                                disabled={!edit}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    {/* Edit / Save button */}
                    <div className="flex justify-end">
                        {edit ? (
                            <button
                                onClick={setPassword}
                                className="btn rounded-xl bg-red-400 hover:bg-red-500 text-white btn-sm"
                            >
                                <Check className="size-[1.2em]" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setEdit(true)}
                                className="btn rounded-xl bg-gray-400 hover:bg-gray-500 text-white btn-sm"
                            >
                                <Pencil className="size-[1.2em]" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <p
                        className={`mt-3 text-sm  ${
                            message.type === "success" ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {message.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
