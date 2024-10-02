import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types";

type PersonaListProps = {
  personas: Persona[];
  onRemovePersona: (id: string) => void;
  onUpdatePersonaContext: (id: string, context: string) => void;
};

export function PersonaList({ personas, onRemovePersona, onUpdatePersonaContext }: PersonaListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {personas.map((persona) => (
        <PersonaCard
          key={persona.id}
          persona={persona}
          onRemove={() => onRemovePersona(persona.id)}
          onUpdateContext={(context) => onUpdatePersonaContext(persona.id, context)}
        />
      ))}
    </div>
  );
}