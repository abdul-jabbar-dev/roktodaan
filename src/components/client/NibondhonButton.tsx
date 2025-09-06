'use client'

import {
    prevStep, 
    setStepData,
    RegisterState,
} from '@/redux/slice/registerSlice';
import BloodGroup from '@/types/blood/group';

import validationBloodInfo, {
    ValidationBloodInfoType,
} from '@/validation/register/bloodInfo';
import validationLastDonation, {
    ValidationLastDonationType,
} from '@/validation/register/lastDonation';
import {
    ValidationPersonalInfoType,
} from '@/validation/register/personalInfo';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Step1 = { motivation: boolean };
type Step2 = { experience: boolean };
type Step3 = {
    lastDonationDate: string;
    lastDonationLocation: string;
    experience: boolean;
};
type Step4 = { bloodGroup: BloodGroup; weight: number; age: number };


type StepStateMap = {
    1: Step1;
    2: Step2;
    3: Step3;
    4: Step4;
};

type StepDispatchMap = {
    3: ValidationLastDonationType;
    4: ValidationBloodInfoType;
};

type NibondhonProps<T extends keyof StepStateMap> = {
    step: T;
    createState?: boolean;
    state?: StepStateMap[T];
    setError?: React.Dispatch<(
        T extends keyof StepDispatchMap
        ? StepDispatchMap[T] | undefined
        : undefined)
    >;
};

const Nibondhon = <T extends keyof StepStateMap>({
    step,
    state, 
    setError,
}: NibondhonProps<T>) => {
    const [globalError, setGlobalError] = useState<{ message?: string }>({});
    const [createData, setCerateData] = useState(false);
    const dispatch = useDispatch();

    // ✅ success alert 3s পরে hide হবে
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (createData) {
            t = setTimeout(() => setCerateData(false), 3000);
        }
        return () => clearTimeout(t);
    }, [createData]);

    // ❌ error alert 3s পরে hide হবে
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (Object.keys(globalError).length > 0) {
            t = setTimeout(() => setGlobalError({}), 3000);
        }
        return () => clearTimeout(t);
    }, [globalError]);

    const hitNext = () => {
        let error: any;

        if (step === 3) error = validationLastDonation(state as Step3);
        else if (step === 4) error = validationBloodInfo(state as Step4);
         

        setError?.(
            error as T extends keyof StepDispatchMap
            ? StepDispatchMap[T] | undefined
            : undefined
        );

        if (error && 'success' in error && !error.success) return;

        dispatch(setStepData({ step, data: state }));
 
    };

    // different step এর UI
    if (step === 1) {
        return (
            <>
                <span className="text-gray-600">স্বেচ্ছাসেবক হিসেবে &nbsp;</span>
                <button
                    onClick={() => dispatch(setStepData({ step, data: state as Step1 }))}
                    className="bg-red-500 btn rounded-xl text-white hover:bg-red-400"
                >
                    নিবন্ধন করুন →
                </button>
            </>
        );
    }

    if (step === 2) {
        return (
            <>
                <button
                    onClick={() => {
                        dispatch(
                            setStepData({ data: { experience: false } as Step2, step: 2 })
                        );
                        dispatch(
                            setStepData({
                                data: {
                                    lastDonationDate: '',
                                    lastDonationLocation: '',
                                    experience: false,
                                } as Step3,
                                step: 3,
                            })
                        );
                    }}
                    className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                >
                    না, আমি প্রথম বার দিবো
                </button>
                <button
                    onClick={() => dispatch(setStepData({ step, data: state as Step2 }))}
                    className="bg-red-500 btn rounded-xl text-white hover:bg-red-400"
                >
                    পূর্বে দিয়েছি →
                </button>
            </>
        );
    }

    return (
        <>
            <button
                onClick={() => dispatch(prevStep())}
                className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
            >
                পূর্বে
            </button>
            <button
                onClick={hitNext}
                className="bg-red-500 btn rounded-xl text-white hover:bg-red-400 transition"
            >
                পরবর্তী →
            </button> 
        </>
    );
};

export default Nibondhon;
