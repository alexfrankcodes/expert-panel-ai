import { Panel } from "@/types";

export const examplePanels: Panel[] = [
  {
    name: "Tech Innovators",
    personas: [
      {
        id: "1",
        name: "Elon Musk",
        description: "Visionary entrepreneur",
        context: "Focuses on electric vehicles, space exploration, and renewable energy",
      },
      {
        id: "2",
        name: "Steve Jobs",
        description: "Apple co-founder",
        context: "Known for revolutionary product design and marketing strategies",
      },
      {
        id: "3",
        name: "Bill Gates",
        description: "Microsoft co-founder",
        context: "Expertise in software, philanthropy, and global health initiatives",
      },
    ],
    apiKey: "",
    provider: "openai",
  },
  {
    name: "Philosophy Masters",
    personas: [
      {
        id: "4",
        name: "Socrates",
        description: "Ancient Greek philosopher",
        context: "Known for the Socratic method and ethical inquiries",
      },
      {
        id: "5",
        name: "Immanuel Kant",
        description: "Enlightenment philosopher",
        context: "Focused on ethics, metaphysics, and epistemology",
      },
      {
        id: "6",
        name: "Friedrich Nietzsche",
        description: "19th-century philosopher",
        context: "Known for critiques of traditional morality and religion",
      },
    ],
    apiKey: "",
    provider: "anthropic",
  },
];