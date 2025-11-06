import { UserState } from "@/redux/slice/userSlice";
import React from "react";
import CDInputToText from "../ui/CDInputToText";
import CDSelectToText from "../ui/CDSelectToText";

type ProfileProps = {
  user: UserState;
  edit: boolean;
  setUser?: React.Dispatch<React.SetStateAction<UserState>>; // optional
};

export default function Profile({ user, edit, setUser }: ProfileProps) { 
  const updateProfile = (field: string, value: unknown) => {
    if (!setUser) return;  
    setUser((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-gray-50 p-3 shadow-sm rounded-xl">
      <div className="flex items-center space-x-2 font-semibold text-gray-800 leading-8">
        <span className="text-gray-600">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>

      <div className="text-gray-700">
        <div className="grid md:grid-cols-2 text-sm">
          {CDInputToText({
            label: "Contact No.",
            value: user?.profile?.phoneNumber,
            edit,
            name: "phoneNumber",
            onChange: (e) => updateProfile("phoneNumber", e.target.value),
          })}

          {CDInputToText({
            label: "Age",
            value: user?.profile?.age,
            edit,
            name: "age",
            onChange: (e) =>
              updateProfile("age", e.target.value ? Number(e.target.value) : 0),
          })}

          {CDSelectToText({
            label: "Gender",
            value: user?.profile?.gender,
            edit,
            name: "gender",
            options: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ],
            onChange: (e) => updateProfile("gender", e.target.value),
          })}

          {CDInputToText({
            label: "Weight",
            value: user?.profile?.weight,
            edit,
            name: "weight",
            onChange: (e) =>
              updateProfile("weight", e.target.value ? Number(e.target.value) : 0),
          })}

          {CDInputToText({
            label: "Email",
            value: user?.profile?.email,
            edit,
            error: edit&&!(user?.credential?.isVerify),
            name: "email",
            onChange: (e) => updateProfile("email", e.target.value),
          })}

          {CDInputToText({
            label: "Birthday",
            value: "Feb 06, 1998", // 👉 এটা পরে dynamic করলে updateProfile("birthday", e.target.value)
            edit,
            name: "birthday",
            onChange: () => {},
          })}
        </div>
      </div>
    </div>
  );
}
