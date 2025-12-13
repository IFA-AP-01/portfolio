import { faHome, faBook, faUsers, faFolder, faTools, faPhone } from '@fortawesome/free-solid-svg-icons';
import AndroidImg from "@/public/Android.webp";
import AppleImg from "@/public/Apple.webp";
import DevDungImg from "@/public/DevDung.webp";
import HuyDevImg from "@/public/HuyDev.webp";
import KotlinImg from "@/public/Kotlin.webp";
import MyJournalImg from "@/public/MyJournalImg.webp";
import NestJsImg from "@/public/NestJs.webp";
import NextJsImg from "@/public/NextJs.webp";
import SwiftImg from "@/public/Swift.webp";
import ThangDevImg from "@/public/ThangDev.webp";
import colorNoteImg from "@/public/colorNoteImg.webp";
import flutterImg from "@/public/Flutter.webp";
import liveSpeakerImg from "@/public/liveSpeakerImg.webp";
import taskManagementImg from "@/public/taskManagementImg.webp";
import tiziImg from "@/public/tiziImg.webp";
import vtvImg from "@/public/vtvImg.webp";
import vueImg from "@/public/VueImg.webp";
import woocommerceImg from "@/public/woocommerce.webp";
import wordpressImg from "@/public/wordpress.webp";
import appDevelopmentImg from "@/public/7050114.webp";
import webDevelopmentImg from "@/public/7050121.webp";
import uiuxDesignImg from "@/public/7141006.webp";
import seoOptimizeImg from "@/public/7141024.webp";
import springImg from "@/public/springImg.webp";
import stoneFabberImg from "@/public/stonefabber.webp";
import aioScannerImg from "@/public/aioScanner.webp";

export const links = [
  {
    name: "Home",
    hash: "#home",
    icon: faHome,
  },
  {
    name: "About",
    hash: "#about",
    icon: faBook,
  },
  {
    name: "Skills",
    hash: "#skills",
    icon: faTools,
  },
  {
    name: "Members",
    hash: "#members",
    icon: faUsers,
  },
  {
    name: "Projects",
    hash: "#projects",
    icon: faFolder,
  },
  {
    name: "Contact",
    hash: "#contact",
    icon: faPhone,
  },
] as const;

export const projectsData = [
  {
    title: "snapbyte.io - File & Object Caching System",
    timeline: "June 2025 - Present",
    description:
      "Snapbyte is a file & object caching system designed to help website owners cut bandwidth costs by caching and offloading large files to a globally distributed edge layer.",
    tags: ["Node.js", "Next.js", "Astro", "Clouldflare", "Redis"],
    imageUrl: liveSpeakerImg,
    videoUrl: "https://cdn.ifateam.dev/snapbyte.mp4",
    viewUrl: "https://snapbyte.io",
  },
  {
    title: "AIO Scanner - OCR Android & iOS App",
    timeline: "Oct 2025 - Present",
    description:
      "Transform any document into digital text with our advanced OCR scanner. From business cards to handwritten notes, experience the future of document digitization",
    tags: ["Kotlin", "Swift", "Firebase", "MLKit", "OpenCV", "LLM", "OCR", "App Check"],
    imageUrl: aioScannerImg,
    videoUrl: "",
    viewUrl: "https://scanner.ifateam.dev",
  },
  {
    title: "Live Speaker - Speech to Translation Software & SAAS",
    timeline: "Jan 2025 - Present",
    description:
      "Discover Livespeaker, the innovative voice translation tool that facilitates multilingual communication.",
    tags: ["Kotlin", "KMP", "Firebase", "Deepgram", "Gemini"],
    imageUrl: liveSpeakerImg,
    videoUrl: "https://cdn.ifateam.dev/OhaioLiveSpeaker.mp4",
    viewUrl: "https://speaker.ohaio.io",
  },
  {
    title: "Aardwolf India - Sales page for material handling",
    timeline: "Mar 2025 - Apr 2025",
    description:
      "Aardwolf manufactures material handling equipment for the stone, glass and metal industries. ",
    tags: ["Wordpress", "PHP", "Elementor", "Woocomerce", "Custom Plugin", "Custom Theme"],
    imageUrl: "",
    videoUrl: "https://cdn.ifateam.dev/Aardwolf.mp4",
    viewUrl: "https://aardwolf.co.in",
  },
  {
    title: "Stone Fabbers - E-magazine for the stone industry",
    timeline: "Feb 2025",
    description:
      "E-magazine for the stone industry, providing information about stone processing machines and tools.",
    tags: ["Wordpress", "PHP", "Flatsome", "Custom Plugin", "Custom Theme"],
    imageUrl: stoneFabberImg,
    videoUrl: "",
    viewUrl: "https://stonefabber.com",
  },
  {
    title: "Battery Meter",
    timeline: "Sep 2024 - Nov 2024",
    description:
      "A lightweight application designed to monitor the battery status of a device, providing real-time updates on battery health.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Glance Widget", "Dynamic Color", "Jetpack Library"],
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
    viewUrl: "https://play.google.com/store/apps/details?id=com.dunghn2201.vuatiengviet_kov",
  },
  {
    title: "Tizi News",
    timeline: "Mar 2021 - Jun 2021",
    description:
      "Channel for buying and selling real estate, jobs, classifieds. Managed and operated by VNCT Investment and Trading Joint Stock Company.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Android", "Java"],
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

export const membersData = [
  {
    title: "Le Duc Thang",
    description:
      "5+ years of in-depth experience in iOS application development. Participated in numerous projects requiring performance optimization and enhanced security.",
    tags: [ AppleImg, SwiftImg, flutterImg, springImg, wordpressImg, woocommerceImg],
    imageUrl: ThangDevImg,
  },
  {
    title: "Huynh Ngoc Huy",
    description:
      "Experienced in developing high-performance applications with a focus on following best practices. Participated in projects related to e-commerce, social networks, chat, and work reservations.",
    tags: [AndroidImg, KotlinImg, flutterImg, NestJsImg, vueImg, NextJsImg, wordpressImg, woocommerceImg],
    imageUrl: HuyDevImg,
  },
  // {
  //   title: "Ho Ngoc Dung",
  //   description:
  //     "A mobile developer. Having 3+ years of experience and strong knowledge of Android/Kotlin, Flutter/Dart. Having extensive experience in publishing applications.",
  //   tags: [flutterImg, AndroidImg, SwiftImg, KotlinImg, AppleImg, vueImg, wordpressImg, woocommerceImg],
  //   imageUrl: DevDungImg,
  // }, 
] as const;

export const skillsData = [
  "Android",
  "iOS",
  "KMP",
  "Kotlin",
  "Swift",
  "Flutter",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "Node.js",
  "Spring",
  "NestJs",
  "Express",
  "MongoDB",
  "MySQL",
  "Supabase",
  "Firebase",
  "GraphQL",
  "Redux",
  "Python",
  "Django",
  "WordPress",
  "WooCommerce",
  "Vercel",
] as const;

export const skillsJob = [
  {
    title: "App Developement",
    imageUrl: appDevelopmentImg,
    description: "",
    tags: ["Android", "Kotlin", "Flutter", "iOS",  "Swift"],
    color: "#EA4C88",
  },
  {
    title: "Web Developement",
    imageUrl: webDevelopmentImg,
    description: "",
    tags: ["React", "Next.js", "Node.js", "NestJs", "Vue", "WordPress"],
    color: "#1CA091",
  },
  {
    title: "AI Integration",
    imageUrl: uiuxDesignImg,
    description: "",
    tags: ["Chatbot", "RAG", "Object Detection", "ML Kit", "Vertex AI", "Cloudflare Workers AI"],
    color: "#F9CC47",
  },
  {
    title: "SEO Optimization",
    imageUrl: seoOptimizeImg,
    description: "",
    tags: ["Schema.org", "Google Analytics", "Google Search Console"],
    color: "#8FA6E9",
  },
]
