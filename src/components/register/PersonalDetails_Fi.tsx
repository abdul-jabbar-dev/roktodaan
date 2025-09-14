'use client';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RegisterState } from "@/redux/slice/registerSlice";
import { prevStep, setStepData, setUserData } from "@/redux/slice/registerSlice";
import validationPersonalInfo, { ValidationPersonalInfoType } from "@/validation/register/personalInfo";
import { store } from "@/redux/store";
import URLS from "@/config";
import { setUserDataFetch } from "@/redux/slice/userSlice";
import { useLocationSelect } from "@/hooks/useLocationSelect";

function validatePassword(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8) errors.push("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
  return errors;
}

// Custom hook for location select


export default function PersonalDetails_Fi() {
  const dispatch = useDispatch();
  const { step5 } = useSelector(({ register }: { register: RegisterState }) => register);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: step5.fullName,
    email: step5.email || "",
    phoneNumber: step5.phoneNumber,
    gender: (step5.gender as "Male" | "Female") || "Male",
    credential: { password: "" },
  });

  const [personalInfoError, setPersonalInfoError] = useState<ValidationPersonalInfoType>();
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(true);
  const [globalError, setGlobalError] = useState<{ message?: string }>({});
  const [success, setSuccess] = useState(false);

  const { division, district, upazila, selectedDivision, setSelectedDivision, selectedDistrict, setSelectedDistrict, selectedUpazila, setSelectedUpazila } = useLocationSelect(step5.address);

  // Password change handler
  const handlePasswordChange = (value: string) => {
    setPersonalInfo({ ...personalInfo, credential: { password: value } });
    setPasswordErrors(validatePassword(value));
  };

  // ✅ Create user / next step
  const createUser = async () => {
    const address = {
      division: selectedDivision?.name || "",
      district: selectedDistrict?.name || "",
      upazila: selectedUpazila?.name || ""
    };
    const userProfile = { ...personalInfo, address };
    const err = validationPersonalInfo(userProfile);
    setPersonalInfoError(err);

    if (!err.success) return;

    dispatch(setStepData({ step: 5, data: userProfile }));
    dispatch(setUserData());
    const currentUserData = (store.getState() as { register: RegisterState }).register.userData;
    if (currentUserData?.profile?.fullName) {
      console.log("currentUserData")
      try {
        const res = await fetch(URLS.USER.CREATE_USER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUserData),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          setGlobalError(errorData || { message: "Unknown error occurred" });
          return;
        }

        const data = await res.json();
        if (data.user.id) {
          const localData = {
            token: data.token as string,
            user: {
              id: data.user.id,
              fullName: data.user.profile.fullName,
              phoneNumber: data.user.profile.phoneNumber,
              bloodGroup: data.user.profile.bloodGroup
            },
            fetchedAt: Date.now()
          };

          dispatch(setUserDataFetch(data.user));

          localStorage.setItem(URLS.LOCAL_STORE.SET_USER, JSON.stringify(localData));
        }
        if (data.error) {
          setGlobalError(data);
        } else {
          setGlobalError({});
          setSuccess(true);
        }
      } catch (err) {
        console.log(err)
        setGlobalError(err instanceof Error ? { message: err.message } : { message: "Unexpected error" });
      }
    }
    setSuccess(true);
  };

  // Auto hide success/error
  useEffect(() => { if (success) { const t = setTimeout(() => setSuccess(false), 3000); return () => clearTimeout(t); } }, [success]);
  useEffect(() => { if (Object.keys(globalError).length > 0) { const t = setTimeout(() => setGlobalError({}), 3000); return () => clearTimeout(t); } }, [globalError]);

  return (
    <section className="max-w-6xl mx-auto px-12 xl:px-0">
      <div className="lg:w-4/5 w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">আপনার ব্যক্তিগত তথ্য দিন</h1>
        <p className="text-lg mb-6 text-gray-600 leading-relaxed">
          এটি আমাদেরকে আপনার রক্তদানের ফ্রিকোয়েন্সি বুঝতে সাহায্য করবে এবং আপনার শরীরের জন্য নিরাপদ সময়সীমা নিশ্চিত করবে।
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            {/* নাম */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                নাম <sup className="text-xs text-neutral">*</sup>
              </label>
              <input
                value={personalInfo.fullName}
                onChange={e => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                placeholder="আপনার সম্পূর্ণ নাম"
                type="text"
                required
                className="w-full border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {personalInfoError?.errors?.fullName && (
                <p className="text-red-500 text-sm">{personalInfoError.errors.fullName._errors[0]}</p>
              )}
            </div>

            {/* ইমেল + জেন্ডার */}
            <div className="w-full flex gap-4">
              <div className="w-9/12">
                <label className="block text-gray-700 font-medium mb-2">ইমেল</label>
                <input
                  value={personalInfo.email || ""}
                  onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  placeholder="আপনার ইমেল"
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                {personalInfoError?.errors?.email && (
                  <p className="text-red-500 text-sm">{personalInfoError.errors.email._errors[0]}</p>
                )}
              </div>

              <div className="w-3/12">
                <label className="block text-gray-700 font-medium mb-2">
                  জেন্ডার <sup className="text-xs text-neutral">*</sup>
                </label>
                <select
                  value={personalInfo.gender}
                  onChange={e => setPersonalInfo({ ...personalInfo, gender: e.target.value as "Male" | "Female" })}
                  className="select border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
                >
                  <option value="Male">জনাব</option>
                  <option value="Female">জনাবা</option>
                </select>
                {personalInfoError?.errors?.gender && (
                  <p className="text-red-500 text-sm">{personalInfoError.errors.gender._errors[0]}</p>
                )}
              </div>
            </div>
          </div>

          {/* ফোন + পাসওয়ার্ড */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                ফোন নম্বর <sup className="text-xs text-neutral">*</sup>
              </label>
              <input
                value={personalInfo.phoneNumber}
                onChange={e => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                placeholder="01*********"
                type="number"
                required
                className="w-full border border-gray-300 rounded-xl px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {personalInfoError?.errors?.phoneNumber && (
                <p className="text-red-500 text-sm">{personalInfoError.errors.phoneNumber._errors[0]}</p>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                পাসওয়ার্ড <sup className="text-xs text-neutral">*</sup>
              </label>
              <div className="relative">
                <input
                  value={personalInfo.credential.password}
                  onChange={e => handlePasswordChange(e.target.value)}
                  placeholder=" আপনার নতুন পাসওয়ার্ড লিখুন "
                  type={showInput ? "password" : "text"}
                  required
                  className="w-full border border-gray-300 rounded-xl pr-8 px-3 py-[10px] focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <div className="absolute inset-y-0 end-3 flex items-center ps-3.5 cursor-pointer" onClick={() => setShowInput(!showInput)}>
                  {showInput ? <span>👁️</span> : <span>🙈</span>}
                </div>
              </div>
              {passwordErrors.length > 0 && (
                <ul className="mt-2 space-y-1 text-red-500 text-sm">
                  {passwordErrors.map((err, idx) => <li key={idx}>⚠ {err}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="lg:w-4/5 w-full mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">আপনার ঠিকানা</h1>
        <p className="text-lg mb-6 text-gray-600 leading-relaxed">
          রক্তদানের জন্য প্রয়োজনে যাতে সহজে যোগাযোগ করা যায়, সেজন্য আপনার বর্তমান ঠিকানা লিখুন (যেমন: জেলা, এলাকা নাম)।
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Division */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">বিভাগ *</label>
            <select
              value={selectedDivision?.id ?? ""}
              onChange={e => {
                const divi = division.find(d => d.id === Number(e.target.value));
                if (divi) {
                  setSelectedDivision({ id: divi.id, name: divi.bn_name });
                  setSelectedDistrict(null);
                  setSelectedUpazila(null);
                }
              }}
              className="select border border-gray-300 w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
            >
              <option value="" disabled>বিভাগ নির্বাচন করুন</option>
              {division.map(d => <option key={d.id} value={d.id}>{d.bn_name}</option>)}
            </select>
            {personalInfoError?.errors?.address?.division && (
              <p className="text-red-500 text-sm">{personalInfoError.errors.address.division._errors[0]}</p>
            )}
          </div>

          {/* District */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">জেলা *</label>
            <select
              value={selectedDistrict?.id ?? ""}
              disabled={!selectedDivision}
              onChange={e => {
                const dist = district.find(d => d.id === Number(e.target.value));
                if (dist) { setSelectedDistrict({ id: dist.id, name: dist.bn_name }); setSelectedUpazila(null); }
              }}
              className="select border border-gray-300 w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
            >
              <option value="" disabled>জেলা নির্বাচন করুন</option>
              {district.filter(d => d.division_id === selectedDivision?.id).map(d => <option key={d.id} value={d.id}>{d.bn_name}</option>)}
            </select>
            {personalInfoError?.errors?.address?.district && (
              <p className="text-red-500 text-sm">{personalInfoError.errors.address.district._errors[0]}</p>
            )}
          </div>

          {/* Upazila */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">উপজেলা *</label>
            <select
              value={selectedUpazila?.id ?? ""}
              disabled={!selectedDistrict}
              onChange={e => {
                const upz = upazila.find(u => u.id === Number(e.target.value));
                if (upz) setSelectedUpazila({ id: upz.id, name: upz.bn_name });
              }}
              className="select border border-gray-300 w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
            >
              <option value="" disabled>উপজেলা নির্বাচন করুন</option>
              {upazila.filter(u => u.district_id === selectedDistrict?.id).map(u => <option key={u.id} value={u.id}>{u.bn_name}</option>)}
            </select>
            {personalInfoError?.errors?.address?.upazila && (
              <p className="text-red-500 text-sm">{personalInfoError.errors.address.upazila._errors[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 text-center lg:text-end flex justify-center lg:justify-end gap-4">
        <button onClick={() => dispatch(prevStep())} className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition">← পূর্বে</button>
        <button onClick={createUser} className="btn rounded-xl bg-red-500 text-white hover:bg-red-400 transition">পরবর্তী →</button>
      </div>

      {/* Success / Error */}
      {success && <div className="alert alert-success mt-2">✅ তথ্য সফলভাবে সংরক্ষিত হয়েছে!</div>}
      {Object.keys(globalError).length > 0 && <div className="alert alert-error mt-2">❌ {globalError.message || JSON.stringify(globalError)}</div>}
    </section>
  );
}
