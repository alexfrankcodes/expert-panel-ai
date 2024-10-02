import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, X } from "lucide-react";
import { Persona } from "@/types";

type PersonaCardProps = {
  persona: Persona;
  onRemove: () => void;
  onUpdateContext: (context: string) => void;
};

export function PersonaCard({ persona, onRemove, onUpdateContext }: PersonaCardProps) {
  const downloadExpertJSON = () => {
    const content = JSON.stringify(persona, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expert_${persona.name.replace(/\s+/g, "_").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-neutral-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-neutral-700">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-neutral-700 border-2 border-primary">
              <AvatarFallback className="text-lg font-bold text-primary">
                {persona.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-primary">{persona.name}</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadExpertJSON}
              className="text-primary hover:text-primary-hover hover:bg-accent hover:bg-opacity-25"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-danger hover:text-danger-hover hover:bg-danger hover:bg-opacity-25"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Textarea
          value={persona.context}
          onChange={(e) => onUpdateContext(e.target.value)}
          placeholder="Add extra context for this persona"
          className="bg-neutral-700 border-neutral-600 text-neutral-100 placeholder-neutral-400"
        />
      </CardContent>
    </Card>
  );
}