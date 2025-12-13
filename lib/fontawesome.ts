import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DM_Sans, Josefin_Sans, Space_Grotesk } from "next/font/google";

library.add(fas);
export const bodyFont = Space_Grotesk({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const headlineFont = Space_Grotesk({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});