import { UserState } from "@/redux/slice/userSlice";
import React  from "react";
import CDInputToText from "../ui/CDInputToText";
import CDSelectToText from "../ui/CDSelectToText";

export default function Profile({ user, edit, setUser }: { user: UserState; edit: boolean, setUser: React.Dispatch<React.SetStateAction<UserState>> }) {
 
  return (
    <div className="bg-gray-50  p-3 shadow-sm rounded-xl">
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
            onChange: (e) => {
              setUser((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  phoneNumber: e.target.value,
                },
              }));
            },
          })}

          {CDInputToText({
            label: "Age", value: user?.profile?.age, edit, name: "age", onChange: (e => {
              setUser((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  age: Number(e.target.value),
                },
              }))
            })
          })}
          {CDSelectToText({
            label: "Gender",
            value: user?.profile?.gender,
            edit: edit,
            name: "gender",
            options: [

              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ],
            onChange: (e => {
              setUser((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  gender: e.target.value,
                },
              }))
            })

          })}
          {CDInputToText({
            label: "Weight", value: user?.profile?.weight, edit, name: "weight", onChange: (e => {
              setUser((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  weight: Number(e.target.value),
                },
              }))
            })
          })}
          {CDInputToText({
            label: "Email", value: user?.profile?.email, edit,
            error: !(user?.credential?.isVerify), name: "email", onChange: (e => {
              setUser((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  email: e.target.value,
                },
              }))
            })
          })}
          {CDInputToText({ label: "Birthday ", value: "Feb 06, 1998", edit, name: "birthday", onChange: (e => { }) })}
        </div>
      </div>
    </div>
  );
}
