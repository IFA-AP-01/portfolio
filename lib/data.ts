import liveSpeakerImg from "@/public/liveSpeakerImg.webp";
import stoneFabberImg from "@/public/stonefabber.webp";
import aioScannerImg from "@/public/aioScanner.webp";
import colorNoteImg from "@/public/colorNoteImg.webp";
import taskManagementImg from "@/public/taskManagementImg.webp";
import tiziImg from "@/public/tiziImg.webp";
import vtvImg from "@/public/vtvImg.webp";

// ---------------------------------------------------------------------------
// Navigation (anchors on the single home page)
// ---------------------------------------------------------------------------

export type NavItem = {
  label: string;
  hash: `#${string}`;
};

export const navItems = [
  { label: "Home", hash: "#home" },
  { label: "Projects", hash: "#projects" },
  { label: "Stack", hash: "#stack" },
  { label: "Contact", hash: "#contact" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const availability = {
  label: "Available for new projects",
  period: "Q4 2026",
} as const;

export const heroStats = [
  { value: "40+", label: "Projects launched" },
  { value: "12", label: "Apps on the stores" },
  { value: "9", label: "Years shipping" },
  { value: "100%", label: "Client retention" },
] as const;

// ---------------------------------------------------------------------------
// Featured Projects (bento grid)
// ---------------------------------------------------------------------------

export type ProjectStatus = "live" | "beta";
export type BentoSpan = 8 | 4 | 6;

export type FeaturedProject = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  tags: readonly string[];
  image: typeof liveSpeakerImg | null;
  videoUrl?: string;
  viewUrl: string;
  status: ProjectStatus;
  span: BentoSpan;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "snapbyte",
    title: "Snapbyte",
    kicker: "File & object caching at the edge",
    description:
      "A file & object caching system that helps website owners cut bandwidth costs by caching and offloading large files to a globally distributed edge layer.",
    tags: ["Next.js", "Node.js", "Cloudflare", "Redis"],
    image: liveSpeakerImg,
    videoUrl: "https://cdn.ifateam.dev/snapbyte.mp4",
    viewUrl: "https://snapbyte.io",
    status: "live",
    span: 8,
  },
  {
    slug: "aio-scanner",
    title: "AIO Scanner",
    kicker: "OCR for Android & iOS",
    description:
      "Transform any document into digital text with our advanced OCR scanner. From business cards to handwritten notes.",
    tags: ["Kotlin", "Swift", "ML Kit", "Firebase"],
    image: aioScannerImg,
    viewUrl: "https://scanner.ifateam.dev",
    status: "live",
    span: 4,
  },
  {
    slug: "live-speaker",
    title: "Live Speaker",
    kicker: "Real-time speech translation",
    description:
      "The innovative voice translation tool that facilitates multilingual communication.",
    tags: ["KMP", "Kotlin", "Deepgram", "Gemini"],
    image: liveSpeakerImg,
    videoUrl: "https://cdn.ifateam.dev/OhaioLiveSpeaker.mp4",
    viewUrl: "https://speaker.ohaio.io",
    status: "live",
    span: 6,
  },
  {
    slug: "stone-fabbers",
    title: "Stone Fabbers",
    kicker: "Publishing platform for the stone industry",
    description:
      "E-magazine for the stone industry, providing information about stone processing machines and tools.",
    tags: ["WordPress", "PHP", "Custom Theme"],
    image: stoneFabberImg,
    viewUrl: "https://stonefabber.com",
    status: "beta",
    span: 6,
  },
];

// Projects kept for a future "More work" strip — not rendered in the bento.
export const otherProjects = [
  {
    title: "Aardwolf India - Sales page for material handling",
    timeline: "Mar 2025 - Apr 2025",
    description:
      "Aardwolf manufactures material handling equipment for the stone, glass and metal industries.",
    tags: ["Wordpress", "PHP", "Elementor", "Woocomerce", "Custom Plugin"],
    imageUrl: null,
    videoUrl: "https://cdn.ifateam.dev/Aardwolf.mp4",
    viewUrl: "https://aardwolf.co.in",
  },
  {
    title: "Battery Meter",
    timeline: "Sep 2024 - Nov 2024",
    description:
      "A lightweight application designed to monitor the battery status of a device, providing real-time updates on battery health.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Glance Widget"],
    imageUrl: tiziImg,
    videoUrl: "https://cdn.ifateam.dev/battery.mp4",
    viewUrl: "https://play.google.com/store/apps/details?id=io.github.ifa.glancewidget",
  },
  {
    title: "King Of Vietnamese",
    timeline: "Jan 2023 - Mar 2023",
    description:
      "The application is an educational game designed to improve the Vietnamese language skills of players, arranges words based on shuffled characters.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Motion Layout"],
    imageUrl: vtvImg,
    videoUrl: "https://cdn.ifateam.dev/King%20of%20Vietnamese.mp4",
    viewUrl:
      "https://play.google.com/store/apps/details?id=com.dunghn2201.vuatiengviet_kov",
  },
  {
    title: "Tizi News",
    timeline: "Mar 2021 - Jun 2021",
    description:
      "Channel for buying and selling real estate, jobs, classifieds. Managed and operated by VNCT Investment and Trading Joint Stock Company.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind"],
    imageUrl: tiziImg,
    videoUrl: "",
    viewUrl: "",
  },
  {
    title: "Task Management",
    timeline: "Sep 2021 - Oct 2021",
    description:
      "A Task Management App will help users easily manage their daily tasks, ensuring they don't miss any important assignments.",
    tags: ["iOS", "SwiftUI", "Github Action", "CoreData"],
    imageUrl: taskManagementImg,
    videoUrl: "",
    viewUrl: "",
  },
  {
    title: "ColorNote",
    timeline: "Aug 2021 - Oct 2021",
    description:
      "ColorNote is a simple yet powerful note-taking application that allows users to efficiently jot down and organize information.",
    tags: ["Android", "Kotlin", "Firebase"],
    imageUrl: colorNoteImg,
    videoUrl: "",
    viewUrl: "",
  },
] as const;

// ---------------------------------------------------------------------------
// Tech Stack & Capabilities
// ---------------------------------------------------------------------------

export type CapabilityGroup = {
  id: string;
  title: string;
  blurb: string;
  items: { name: string }[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "frontend",
    title: "Frontend & Native",
    blurb: "Pixel-perfect interfaces and native apps that feel instant.",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue" },
      { name: "TypeScript" },
      { name: "Kotlin" },
      { name: "Swift" },
      { name: "KMP" },
      { name: "Flutter" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Cloud",
    blurb: "Scalable APIs and infrastructure that survive launch day.",
    items: [
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Spring" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "Cloudflare" },
      { name: "Vercel" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "design",
    title: "Design & Motion",
    blurb: "Craft, motion and brand systems that ship with the code.",
    items: [
      { name: "Figma" },
      { name: "Design Systems" },
      { name: "Framer Motion" },
      { name: "Lottie" },
      { name: "Motion Layout" },
      { name: "Brand & Identity" },
      { name: "Accessibility" },
      { name: "Performance" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Site meta / socials
// ---------------------------------------------------------------------------

export const siteMeta = {
  name: "IFA Team",
  email: "hi@ifateam.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/huyhunhngc" },
    { label: "Discord", href: "https://discord.gg/DaeSfrkfnS" },
  ],
} as const;
