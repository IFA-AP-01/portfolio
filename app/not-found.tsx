export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="bento-card max-w-md px-10 py-12 text-center">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-subtle">
          Error 404
        </p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-fg">
          Page not found
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[15px] font-semibold text-canvas transition-colors duration-200 hover:bg-fg/90"
        >
          Back home
        </a>
      </div>
    </div>
  );
}
