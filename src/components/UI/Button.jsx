/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        " border-2 border-primary outline-none  text-white font-bold py-2 px-4 rounded flex items-center disabled:opacity-50 justify-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
}
