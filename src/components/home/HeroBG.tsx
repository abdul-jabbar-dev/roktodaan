import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function HeroBG() {
    const [offset, setOffset] = useState(-140);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const newOffset = -(width * 140 / 1920);
            setOffset(newOffset);
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div
            className="absolute left-0 w-full z-0"
            style={{ bottom: `${offset}px` }}
        >
            <Image
                width={300}
                height={200}
                src="/svg/bloodHero.svg"
                alt="Hero Illustration"
                className="w-full h-auto object-contain opacity-60"
            />
        </div>
    )
}
