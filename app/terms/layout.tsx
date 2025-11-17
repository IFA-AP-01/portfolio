import { ReactNode } from "react";

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf8f1] dark:bg-[#131313] transition-colors duration-300">
      <div className="relative">
        {/* Background decorations consistent with main site */}
        <div className="bg-gradient-to-r from-[#fa82d8] to-[#6297f0] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:from-[#873f20] dark:to-[#000000] transition-colors duration-300"></div>
        <div className="bg-gradient-to-r from-[#face91] to-[#fa9270] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:from-[#000000] dark:to-[#4d2f22] transition-colors duration-300"></div>
        
        {children}
      </div>
    </div>
  );
}