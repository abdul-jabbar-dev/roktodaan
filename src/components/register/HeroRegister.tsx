'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'

import RegisterFirtsStep from './RegisterFirtsStep'
import PreviousExperience_Se from './PreviousExperience_Se'
import LastDonation_Th from './LastDonation_Th'
import BloodInfo_Fo from './BloodInfo_Fo'
import PersonalDetails_Fi from './PersonalDetails_Fi'
import Varification_Last from './Varification_Last'
import { RegisterState } from '@/redux/slice/registerSlice';
import { UserState } from '@/redux/slice/userSlice';

export default function HeroRegister() {
  const [isLogin, setIsLogin] = useState(false)

  const user = useSelector(({ user }: { user: UserState }) => user)
  const { step: currentStep, step2 } = useSelector(
    ({ register }: { register: RegisterState }) => register
  )

  const [prevStep, setPrevStep] = useState(currentStep)

  // step change track
  useEffect(() => {
    setPrevStep(currentStep)
  }, [currentStep])

  // login state update
  useEffect(() => {
    setIsLogin(!!user?.id)
  }, [user?.id])

  const direction = currentStep > prevStep ? 1 : -1

  const stepVariants = {
    hidden: { opacity: 0, x: 100 * direction },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -100 * direction, transition: { duration: 0.4 } }
  }

  const steps = [
    <RegisterFirtsStep key="s1" />,
    <PreviousExperience_Se key="s2" />,
    <LastDonation_Th key="s3" />,
    <BloodInfo_Fo key="s4" />,
    <PersonalDetails_Fi key="s5" />,
    <Varification_Last key="s6" />,
  ]

  // যদি step2.experience না থাকে আর currentStep = 3 হয় → skip করে 4 এ যাবে
  const effectiveStep =
    !step2.experience && currentStep === 3 ? 4 : currentStep

  if (isLogin) {
    return null // logged in হলে register form দেখাবে না
  }

  return (
    <section className="py-28 bg-red-50 overflow-x-hidden">
      {steps.slice(effectiveStep - 1, effectiveStep).map((StepComponent) => (
        <motion.div
          key={effectiveStep}
          variants={stepVariants }
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mb-10"
        >
          {StepComponent}
        </motion.div>
      ))}
    </section>
  )
}
