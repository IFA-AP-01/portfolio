export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-periwinkle px-4 py-24">
      <div className="slab max-w-md px-10 py-12 text-center">
        <p className="eyebrow text-ink/60">Error 404</p>
        <h1 className="mt-4 font-heading text-[32px] font-normal tracking-[-0.01em]">
          Page not found
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-2.5 text-[15px] font-medium text-white transition-colors duration-300 ease-out hover:bg-indigo"
        >
          Back home
        </a>
      </div>
    </div>
  );
}
