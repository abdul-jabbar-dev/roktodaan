'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'

import RegisterFirtsStep from './RegisterFirtsStep'
import PreviousExperience_Se from './PreviousExperience_Se'
import LastDonation_Th from './LastDonation_Th'
import BloodInfo_Fo from './BloodInfo_Fo'
import PersonalDetails_Fi from './PersonalDetails_Fi'
import { RegisterState } from '@/redux/slice/registerSlice';

export default function HeroRegister() {
    const { step: currentStep, step2 } = useSelector(({ register }: { register: RegisterState }) => register)
    const [prevStep, setPrevStep] = useState(currentStep)

    useEffect(() => {
        setPrevStep(currentStep)
    }, [currentStep])

    const direction = currentStep > prevStep ? 1 : -1

    const stepVariants = {
        hidden: { opacity: 0, x: 100 * direction },   // right or left start
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, x: -100 * direction, transition: { duration: 0.4 } }
    }

    const steps = [
        <RegisterFirtsStep key="s1" />,
        <PreviousExperience_Se key="s2" />,
        <LastDonation_Th key="s3" />,
        <BloodInfo_Fo key="s4" />,
        <PersonalDetails_Fi key="s5" />,
    ]
    const effectiveStep = !step2.experience && currentStep === 3 ?
        4
        : currentStep
    return (
        <section className="py-28 bg-red-50 overflow-x-hidden">
            {steps.map((StepComponent, i) => {
                if (i + 1 !== effectiveStep) return null
                return (
                    <motion.div
                        key={i}
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-10"
                    >
                        {StepComponent}
                    </motion.div>
                )
            })}
        </section>
    )
}
