import { ArrowRight } from "@/components/ui/button";

export default function SubmitBtn({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-white transition-colors duration-300 ease-out hover:bg-indigo disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <>
          Send message
          <ArrowRight />
        </>
      )}
    </button>
  );
}
