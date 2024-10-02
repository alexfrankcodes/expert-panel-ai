import { PanelControls } from "./PanelControls";
import { Panel } from "@/types";

type HeaderProps = {
  panels: Panel[];
  selectedPanel: string | null;
  onSavePanel: (panelName: string) => void;
  onLoadPanel: (panelName: string) => void;
  onOpenSettings: () => void;
};

export function Header({
  panels,
  selectedPanel,
  onSavePanel,
  onLoadPanel,
  onOpenSettings,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Expert AI Panel
      </h1>
      <PanelControls
        panels={panels}
        selectedPanel={selectedPanel}
        onSavePanel={onSavePanel}
        onLoadPanel={onLoadPanel}
        onOpenSettings={onOpenSettings}
      />
    </div>
  );
}