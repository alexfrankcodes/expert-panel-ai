import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TopicInputProps = {
  topic: string;
  onTopicChange: (topic: string) => void;
  onGenerateResponses: () => void;
  isLoading: boolean; // Add this new prop
};

export function TopicInput({
  topic,
  onTopicChange,
  onGenerateResponses,
  isLoading,
}: TopicInputProps) {
  return (
    <div className="space-y-2">
      <Input
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        placeholder="Enter a topic for discussion"
        className="bg-secondary border-secondary text-neutral-100 placeholder-neutral-400"
      />
      <Button
        onClick={onGenerateResponses}
        className="w-full bg-accent hover:bg-accent-hover"
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? "Generating..." : "Generate Responses"}
      </Button>
    </div>
  );
}
