import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none shadow-sm";

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-[#C44B34] text-white hover:bg-[#A63B28] hover:shadow-md", // terracotta
    secondary:
        "bg-[#3B261D] text-white hover:bg-[#2B1B14] hover:shadow-md", // dark
    accent:
        "bg-[#C78C3B] text-white hover:bg-[#A9712F] hover:shadow-md", // or
    ghost:
        "border border-black/15 text-black/80 hover:bg-black/5 hover:border-black/30",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return <button className={classes} {...props} />;
}


