'use client'
import { X } from 'lucide-react'
import React, { useState } from 'react'
export default function TopNotify() {
  const [visible, setVisible] = useState(true)
  return (
    (visible && <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-red-400  px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >

      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >

      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="md:text-sm/6 text-xs  text-gray-100">

          আজই রক্তদাতা হিসেবে নিবন্ধন করুন, কারো জীবনের পরম সহায়ক হোন।
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-white/20 px-5 py-1  text-xs font-semibold text-white shadow-xs inset-ring-white/20 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          স্বেচ্ছাসেবক হোন <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button onClick={() => setVisible(false)} type="button" className="cursor-pointer -m-3 p-3 focus-visible:-outline-offset-4">
          <span className="sr-only">Dismiss</span>
          <X aria-hidden="true" className="size-5 text-gray-100" />
        </button>
      </div>
    </div>)
  )
}