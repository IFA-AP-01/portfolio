export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-24">
      <div className="card max-w-md px-10 py-12 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 font-heading text-[32px] font-bold tracking-[-0.05em]">
          Page not found
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="btn btn-primary mt-8"
        >
          Back home
        </a>
      </div>
    </div>
  );
}
