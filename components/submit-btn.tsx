import { ArrowRight } from "@/components/ui/button";

export default function SubmitBtn({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="btn btn-primary group mt-1 w-full disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas border-t-transparent" />
      ) : (
        <>
          Send message
          <ArrowRight />
        </>
      )}
    </button>
  );
}
