'use client'
import { nextStep, prevStep } from '@/redux/slice/registerSlice';
import { useDispatch } from 'react-redux';
export default function Nibondhon({ state }: { state: number }) {
    const dispatch = useDispatch();
    // const step3 = useSelector(({ register }: { register: RegisterState }) => register.step1);


    if (state == 1) {
        return (
            <>
                <span className="text-gray-600">স্বেচ্ছাসেবক হিসেবে &nbsp;</span>
                <button onClick={() => dispatch(nextStep())} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                    নিবন্ধন করুন →
                </button>
            </>)
    } else if (state == 2) {
        return (<>
            <button onClick={() => dispatch(prevStep())} className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                না, আমি প্রথম বার দিবো
            </button>
            <button onClick={() => dispatch(nextStep())} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                পূর্বে দিয়েছি →
            </button>
        </>)
    } else {    
        return (<>

            <button
                onClick={() => dispatch(prevStep())}
                className="btn rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                পূর্বে
            </button>
            <button onClick={() => dispatch(nextStep())} className="bg-red-500 btn rounded-xl  text-white hover:bg-red-400">
                পরবর্তী  →
            </button>

        </>)

    }


}