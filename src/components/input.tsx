import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
    Icon: LucideIcon
}

export function Input({ Icon, ...props }: InputProps) {
    return (
        <div className="px-3 w-72 py-1.5 border border-white/20 rounded-lg text-sm flex items-center gap-3">
          <Icon className="size-4 text-emerald-300" />
          <input
            {...props}
            className="bg-transparent placeholder:text-zinc-300 flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          />
        </div>
    )
}