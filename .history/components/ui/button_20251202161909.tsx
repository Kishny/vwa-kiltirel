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
        "bg-vwa-terracotta text-white hover:bg-vwa-terracotta/90 hover:shadow-md",
    secondary: "bg-vwa-dark text-white hover:bg-vwa-dark/90 hover:shadow-md",
    accent: "bg-vwa-accent text-white hover:bg-vwa-accent/90 hover:shadow-md",
    ghost:
        "border border-vwa-dark/20 text-vwa-dark hover:bg-vwa-dark/5 hover:border-vwa-dark/40",
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
