import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "border border-white/20 rounded-md p-1.5 transition-colors",
        transparent ? "bg-black/20 hover:bg-white/10" : "bg-white/10 hover:bg-white/20",
        props.disabled ? "opacity-50 cursor-not-allowed" : "",
        props.className
      )}
    />
  );
}
