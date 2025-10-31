'use client'
import API from "@/api";
import { setUserDonationExperianceDataFetch, UserState } from "@/redux/slice/userSlice";
import ClientDate from "@/utils/DateFormet";
import { Clock12Icon, Plus, Pencil, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
export default function DonationExperiance({
  user,
  rootEdit,
}: {
  user: UserState;
  rootEdit: boolean;
}) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newExperiance, setNewExperiance] = useState<{ date: string; location: string }>({ date: "", location: "" });

  // auto hide message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000); // 3 sec
      return () => clearTimeout(timer);
    }
  }, [message]);

  const saveUpdate = () => {

    setEdit(false);
    setEditingId(null);
    setNewExperiance({ date: "", location: "" });
  };

  const addExperiance = async (prop?: { date: string; id?: number; location: any }) => {
    try {
      const payload = {
        id: prop?.id,
        lastDonationDate: prop?.date || newExperiance.date,
        lastDonationLocation: prop?.location || newExperiance.location,
      };
      if (!payload.lastDonationDate || !payload.lastDonationLocation) {
        setMessage({ type: "error", text: "Date & Location required!" });
        return;
      }

      const res = await API.user.updateExperiance(payload);

      if (res?.data?.data) {
        dispatch(setUserDonationExperianceDataFetch(res?.data?.data));
        toast.success("রক্ত প্রদানের অভিজ্ঞতা যোগ হয়েছে")
        saveUpdate();

      } else {
        toast.error(res?.error)
      }
    } catch (err: any) {
      toast.error(err?.error || err.message || "দুঃখিত আবার চেষ্টা করুন ")

    }
  };

  return (
    <div className="bg-gray-50 p-3 shadow-sm rounded-xl relative">
      {/* Title */}
      <div className="flex items-center space-x-2 font-semibold text-gray-800 leading-8">
        <span className="text-gray-600">
          <Clock12Icon className="h-[18px]" />
        </span>
        <span className="tracking-wide">Last Donations</span>
      </div>

      <div className="overflow-x-auto rounded-box border-base-content/5 bg-gray-50">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Location</th>
              {edit && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {/* Add new row */}
            {(edit && !editingId) && (
              <tr>
                <th></th>
                <td>
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full"
                    value={newExperiance.date}
                    onChange={(e) => {
                      const disabledDates =
                        user.donationExperience?.map((d) =>
                          new Date(d.lastDonationDate).toISOString().split("T")[0]
                        ) || [];

                      const selectedDate = e.target.value;
                      if (disabledDates.includes(selectedDate)) {
                        setMessage({ type: "error", text: "This date already used!" });
                        e.target.value = "";
                        return;
                      }

                      setNewExperiance({ ...newExperiance, date: selectedDate });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Add Donation Location"
                    className="w-full"
                    value={newExperiance.location}
                    onChange={(e) =>
                      setNewExperiance({ ...newExperiance, location: e.target.value })
                    }
                  />
                </td>
                <td>
                  <Plus
                    className="cursor-pointer"
                    onClick={() => addExperiance()}
                  />
                </td>
              </tr>
            )}

            {/* Existing rows */}
            {(user?.donationExperience && user.donationExperience.length > 0) ? user.donationExperience
              ?.slice()
              ?.sort(
                (a, b) =>
                  new Date(b.lastDonationDate).getTime() -
                  new Date(a.lastDonationDate).getTime()
              )
              ?.map((exp, i) => (
                <tr key={i + 1}>
                  <th>{i + 1}</th>
                  <td>
                    {editingId === i + 1 ? (
                      <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={newExperiance.date}
                        onChange={(e) =>
                          setNewExperiance({ ...newExperiance, date: e.target.value })
                        }
                      />
                    ) : (
                      <ClientDate dateString={exp?.lastDonationDate} />
                    )}
                  </td>
                  <td>
                    {editingId === i + 1 ? (
                      <input
                        type="text"
                        value={newExperiance.location}
                        onChange={(e) =>
                          setNewExperiance({
                            ...newExperiance,
                            location: e.target.value,
                          })
                        }
                      />
                    ) : (
                      exp?.lastDonationLocation
                    )}
                  </td>
                  {edit && (
                    <td>
                      {editingId === i + 1 ? (
                        <button
                          className="text-green-600"
                          onClick={() =>
                            addExperiance({
                              id: exp.id,
                              date: newExperiance.date,
                              location: newExperiance.location,
                            })
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="text-blue-600"
                          onClick={() => {

                            setEditingId(i + 1);
                            setNewExperiance({
                              date: new Date(exp.lastDonationDate)
                                .toISOString()
                                .split("T")[0],
                              location: exp?.lastDonationLocation,
                            });
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              )) : <tr>
              <td colSpan={edit ? 4 : 3} className="text-center text-gray-500 py-3">
                No Record exist
              </td>
            </tr>}
          </tbody>
        </table>
      </div>

      {rootEdit && (
        <div className="flex justify-end w-full top-0 right-0 absolute">
          {edit ? (
            <button
              onClick={saveUpdate}
              className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm transition-all"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Done</span>
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm transition-all"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit History</span>
            </button>
          )}
        </div>
      )}

      {/* Message */}
      {message && (
        <p
          className={`mt-3 w-full text-center fixed bottom-[60px] text-sm transition-opacity duration-500 ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
