import { DiagramEditor } from "./components/DiagramEditor";


export const metadata = {
  title: "Diagram Maker",
  description: "Create professional diagrams and flowcharts in seconds.",
  keywords: [
    "diagram maker",
    "flowchart maker",
    "online diagram tool",
    "collaborative diagramming",
  ],
  openGraph: {
    title: "Diagram Maker",
    description: "Create professional diagrams and flowcharts in seconds.",
    type: "website",
    url: "https://ifateam.dev/diagram",
    siteName: "IFA Team",
  },
};

export default function DiagramPage() {
  return (
    <main className="h-screen bg-[#faf8f1] dark:bg-[#191C1E] overflow-hidden">
      <DiagramEditor />
    </main>
  );
}
