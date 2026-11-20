"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
    const [position, setPosition] = useState({
        x: -500,
        y: -500,
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className="
                pointer-events-none
                fixed
                z-[9999]
                w-[600px]
                h-[600px]
                rounded-full
                -translate-x-1/2
                -translate-y-1/2
                blur-3xl
                transition-[left,top]
                duration-300
                ease-out
            "
            style={{
                left: position.x,
                top: position.y,
                background: `
                    radial-gradient(
                        circle,
                        rgba(188, 252, 88, 0.10) 0%,
                        rgba(122, 237, 176, 0.06) 25%,
                        rgba(188, 252, 88, 0.025) 45%,
                        transparent 70%
                    )
                `,
            }}
        />
    );
}