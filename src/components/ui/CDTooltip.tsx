import React, { ReactNode } from 'react';
import { Tooltip, Whisper } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; // rsuite CSS ইম্পোর্ট করা হয়েছে (যদি না করা থাকে)
import { TypeAttributes } from 'rsuite/esm/internals/types';

/**
 * @param {string} tooltipText - যে টেক্সটটি টুলটিপে দেখাবে।
 * @param {('top'|'bottom'|'left'|'right')} [placement='top'] - টুলটিপটি কোথায় দেখাবে।
 * @param {React.ReactNode} children - যার উপরে হোভার করলে টুলটিপটি দেখাবে।
 */
function CDTooltip({ tooltipText, placement = 'top', children }:{ tooltipText:string, placement :TypeAttributes.Placement | undefined, children:ReactNode }) {
  
  // tooltipText-কে কন্টেন্ট হিসেবে নিয়ে একটি Tooltip কম্পোনেন্ট তৈরি করা হলো
  const speaker = <Tooltip>{tooltipText}</Tooltip>;

  return (
    // Whisper কম্পোনেন্টটি hover ট্রিগারে Tooltip-কে দেখাবে
    <Whisper 
      placement={placement } 
      trigger="hover" 
      speaker={speaker}
      // ডিফল্ট ডিলিং: মাউস সরানোর সাথে সাথে চলে যাবে
      enterable 
    >
      {/* এই অংশটি ইউজার যেটা দেখতে পাবে, সেটার উপরে হোভার করলে ট্রিগার হবে */}
      {children}
    </Whisper>
  );
}

export default CDTooltip;