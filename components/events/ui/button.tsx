"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
    "inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-vwa-background pressable",
    {
        variants: {
            variant: {
                primary:
                    "bg-vwa-terracotta text-white md:hover:-translate-y-[3px] md:hover:scale-[1.02] md:hover:shadow-[0_12px_28px_-10px_rgba(196,75,52,0.9)]",
                accent:
                    "bg-vwa-accent text-white md:hover:-translate-y-[3px] md:hover:scale-[1.02] md:hover:shadow-[0_12px_28px_-10px_rgba(199,140,59,0.9)]",
                secondary:
                    "bg-white text-vwa-dark border border-vwa-dark/10 shadow-sm md:hover:-translate-y-[3px] md:hover:scale-[1.02] md:hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.18)]",
                ghost:
                    "bg-transparent text-vwa-dark border border-transparent md:hover:bg-vwa-dark/5",
            },
            size: {
                sm: "px-4 py-1.5 text-xs",
                md: "px-5 py-2 text-sm",
                lg: "px-6 py-2.5 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> { }

export default function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <button className={cn(buttonStyles({ variant, size }), className)} {...props} />
    );
}


