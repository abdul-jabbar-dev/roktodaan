// CDTooltip.tsx

import React, { ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip'; // Radix UI Tooltip 
// RSuite-এর TypeAttributes ব্যবহার না করে Radix-এর Type ব্যবহার করাই ভালো

// আমরা এখন Radix-এর টাইপ ব্যবহার করব
type Placement = 'top' | 'bottom' | 'left' | 'right'; 

function CDTooltip({ 
  tooltipText, 
  placement = 'top', 
  children 
}: { 
  tooltipText: string, 
  placement?: Placement, // Radix-এর প্লেসমেন্ট
  children: ReactNode 
}) {

  // Radix UI Tooltip ব্যবহার করে একটা সহজ কিন্তু কাস্টমাইজেবল টুলটিপ তৈরি
  return (
    <Tooltip.Provider delayDuration={150}> {/* সামান্য ডিলে দিলে UX ভালো হয় */}
      <Tooltip.Root>
        
        {/* ট্রিগার: যে এলিমেন্টের উপর হোভার করা হবে */}
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>

        {/* কন্টেন্ট: যা টুলটিপে দেখাবে */}
        <Tooltip.Portal>
          <Tooltip.Content 
            className={`
              bg-gray-800 text-white text-sm p-2 rounded-md 
              shadow-lg z-50 animate-in fade-in-0 zoom-in-95 
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 
              data-[side=bottom]:slide-in-from-top-2 
              data-[side=left]:slide-in-from-right-2
            `}
            side={placement} // Radix-এর 'side' prop RSuite-এর 'placement'-এর মতো
            sideOffset={5} // ট্রিগার থেকে কত দূরে থাকবে
          >
            {tooltipText}
            {/* টুলটিপের ছোট্ট তীর চিহ্ন */}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
        
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CDTooltip;