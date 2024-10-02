import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Settings } from "lucide-react";
import { Panel } from "@/types";

type PanelControlsProps = {
  panels: Panel[];
  selectedPanel: string | null;
  onSavePanel: (panelName: string) => void;
  onLoadPanel: (panelName: string) => void;
  onOpenSettings: () => void;
};

export function PanelControls({
  panels,
  selectedPanel,
  onSavePanel,
  onLoadPanel,
  onOpenSettings,
}: PanelControlsProps) {
  const handleSavePanel = () => {
    const panelName = prompt("Enter a name for this panel:");
    if (panelName) {
      onSavePanel(panelName);
    }
  };

  return (
    <div className="flex space-x-2">
      <Select value={selectedPanel || ""} onValueChange={onLoadPanel}>
        <SelectTrigger className="w-[180px] bg-secondary border-secondary text-neutral-100">
          <SelectValue placeholder="Load Panel" />
        </SelectTrigger>
        <SelectContent className="bg-secondary border-secondary text-neutral-100">
          {panels.map((panel, index) => (
            <SelectItem key={index} value={panel.name}>
              {panel.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleSavePanel}
        variant="outline"
        className="bg-secondary border-secondary text-primary hover:bg-secondary-hover"
      >
        <Save className="mr-2 h-4 w-4" /> Save Panel
      </Button>
      <Button
        onClick={onOpenSettings}
        variant="outline"
        size="icon"
        className="bg-secondary border-secondary text-primary hover:bg-secondary-hover"
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}