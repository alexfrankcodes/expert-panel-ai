import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Persona } from "@/types";
import { PlusCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";

type AddPersonaFormProps = {
  onAddPersona: (persona: Persona) => void;
};

export function AddPersonaForm({ onAddPersona }: AddPersonaFormProps) {
  const [newPersona, setNewPersona] = useState<Persona>({
    id: "",
    name: "",
    description: "",
    context: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (newPersona.name && newPersona.description) {
      onAddPersona({ ...newPersona, id: Date.now().toString() });
      setNewPersona({ id: "", name: "", description: "", context: "" });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (json.name && json.description) {
            const uploadedPersona: Persona = {
              id: Date.now().toString(),
              name: json.name,
              description: json.description,
              context: json.context || "",
            };
            onAddPersona(uploadedPersona);
            setNewPersona({ id: "", name: "", description: "", context: "" });
          } else {
            alert("Invalid expert JSON format");
          }
        } catch (error) {
          alert("Error parsing JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="bg-secondary bg-opacity-50 backdrop-filter backdrop-blur-lg border-secondary">
      <CardContent className="p-4 space-y-4">
        <Input
          value={newPersona.name}
          onChange={(e) =>
            setNewPersona({ ...newPersona, name: e.target.value })
          }
          placeholder="Expert Name"
          className="bg-secondary-hover border-secondary text-neutral-100 placeholder-neutral-400"
        />
        <Input
          value={newPersona.description}
          onChange={(e) =>
            setNewPersona({ ...newPersona, description: e.target.value })
          }
          placeholder="Expert Description"
          className="bg-secondary-hover border-secondary text-neutral-100 placeholder-neutral-400"
        />
        <Textarea
          value={newPersona.context}
          onChange={(e) =>
            setNewPersona({ ...newPersona, context: e.target.value })
          }
          placeholder="Additional Context (optional)"
          className="bg-secondary-hover border-secondary text-neutral-100 placeholder-neutral-400"
        />
        <div className="flex space-x-2">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-accent hover:bg-accent-hover"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expert
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="bg-secondary border-secondary text-primary hover:bg-secondary-hover"
          >
            <Upload className="mr-2 h-4 w-4" /> Load Expert
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            style={{ display: "none" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
