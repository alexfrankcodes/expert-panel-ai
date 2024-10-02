import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  provider: string;
  onSave: (apiKey: string, provider: string) => void;
};

export function SettingsDialog({
  isOpen,
  onClose,
  apiKey,
  provider,
  onSave,
}: SettingsDialogProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localProvider, setLocalProvider] = useState(provider);

  const handleSave = () => {
    onSave(localApiKey, localProvider);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-secondary text-neutral-100">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="bg-secondary-hover border-secondary text-neutral-100 placeholder-neutral-400"
            />
          </div>
          <RadioGroup
            value={localProvider}
            onValueChange={setLocalProvider}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="openai" id="openai" />
              <Label htmlFor="openai">OpenAI</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anthropic" id="anthropic" />
              <Label htmlFor="anthropic">Anthropic</Label>
            </div>
          </RadioGroup>
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary-hover"
          >
            Save API Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
