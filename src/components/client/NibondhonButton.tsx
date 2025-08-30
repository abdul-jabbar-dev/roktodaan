'use client'
import { nextStep, prevStep, setStepData } from '@/redux/slice/registerSlice';
import { useDispatch } from 'react-redux';


type Step1 = { motivation: boolean }
type Step2 = { experience: boolean }
type Step3 = { lastDonationDate: string, lastDonationLocation: string, experience: boolean }
type Step4 = {
    bloodGroup: string,
    weight: number,
    age: number,
}
type Step5 = {
    fullName: string,
    email: string,
    phoneNumber: string,
    gender: 'Male' | 'Female',
    address: { division: string, district: string, upazila: string },
}

type NibondhonProps<T extends keyof StepStateMap> = {
    step: T
    state?: StepStateMap[T]
}
type StepStateMap = {
    1: Step1
    2: Step2
    3: Step3
    4: Step4
    5: Step5
}
export default function Nibondhon<T extends keyof StepStateMap>({
    step,
    state,
}: NibondhonProps<T>) {
    const dispatch = useDispatch();
    // const step3 = useSelector(({ register }: { register: RegisterState }) => register.step1);


    if (step == 1) {
        const hitNext = () => {
            dispatch(setStepData({ step, data: state as Step1 }))
        }
        return (
            <>
                <span className="text-gray-600">স্বেচ্ছাসেবক হিসেবে &nbsp;</span>
                <button onClick={hitNext} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                    নিবন্ধন করুন →
                </button>
            </>)
    } else if (step == 2) {
        const hitNext = () => {
            dispatch(setStepData({ data: state as Step2, step }))
        }
        return (<>
            <button onClick={() => dispatch(setStepData({ data: { experience: false } as Step2, step }))} className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                না, আমি প্রথম বার দিবো
            </button>
            <button onClick={hitNext} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                পূর্বে দিয়েছি →
            </button>
        </>)
    } else {
        const hitNext = () => {
            dispatch(setStepData({ step, data: state as Step3 | Step4 | Step5 }))
        }
        return (<>

            <button
                onClick={() => dispatch(prevStep())}
                className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                পূর্বে
            </button>
            <button onClick={hitNext} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                পরবর্তী  →
            </button>

        </>)

    }


}