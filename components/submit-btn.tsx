import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-canvas transition-colors duration-200 hover:bg-fg/90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas border-t-transparent" />
      ) : (
        <>
          Send message
          <FaPaperPlane className="text-[13px] transition-transform duration-200 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
