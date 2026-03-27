import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none shadow-sm",
    {
        variants: {
            variant: {
                primary:
                    "bg-vwa-terracotta text-white hover:bg-vwa-terracotta/90 hover:shadow-md",
                secondary:
                    "bg-vwa-dark text-white hover:bg-vwa-dark/90 hover:shadow-md",
                accent:
                    "bg-vwa-accent text-white hover:bg-vwa-accent/90 hover:shadow-md",
                ghost:
                    "border border-vwa-dark/20 text-vwa-dark hover:bg-vwa-dark/5 hover:border-vwa-dark/40",
            },
            size: {
                sm: "px-4 py-1.5 text-sm",
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

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyles>;

export default function Button({
    variant,
    size,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonStyles({ variant, size, className })}
            {...props}
        />
    );
}
