import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="neo-button group flex items-center justify-center gap-2 h-[3.5rem] w-[9rem] bg-[#E9945B] text-black hover:bg-[#d6854f] disabled:bg-gray-500 disabled:scale-100 disabled:shadow-none dark:bg-[#E9945B] dark:hover:bg-[#d6854f]"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white dark:border-black"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}
