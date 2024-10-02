"use client";

import { AddPersonaForm } from "@/components/AddPersonaForm";
import { Header } from "@/components/Header";
import { PersonaList } from "@/components/PersonaList";
import { ResponseList } from "@/components/ResponseList";
import { SettingsDialog } from "@/components/SettingsDialog";
import { TopicInput } from "@/components/TopicInput";
import { examplePanels } from "@/data/examplePanels";
import { Panel, Persona, Response } from "@/types";
import { useEffect, useState } from "react";

export default function ExpertAIPanel() {
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState("openai");
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [topic, setTopic] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [panels, setPanels] = useState<Panel[]>(examplePanels);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load stored data
    const storedProvider = localStorage.getItem("provider");
    const storedPersonas = localStorage.getItem("personas");
    const storedPanels = localStorage.getItem("panels");
    if (storedProvider) setProvider(storedProvider);
    if (storedPersonas) setPersonas(JSON.parse(storedPersonas));
    if (storedPanels) {
      const loadedPanels = JSON.parse(storedPanels);
      setPanels([...examplePanels, ...loadedPanels]);
    }
  }, []);

  const handleSaveApiConfig = (newApiKey: string, newProvider: string) => {
    setApiKey(newApiKey);
    setProvider(newProvider);
    localStorage.setItem("provider", newProvider);
    alert("API configuration saved!");
  };

  const handleGenerateResponses = async () => {
    if (!topic || personas.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          apiKey,
          topic,
          personas,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate responses");
      }

      const data = await response.json();
      setResponses(data.responses);
    } catch (error) {
      console.error("Error generating responses:", error);
      alert(
        "Failed to generate responses. Please check your API configuration and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const savePanel = (panelName: string) => {
    const newPanel: Panel = {
      name: panelName,
      personas,
      provider,
    };

    const updatedPanels = [...panels, newPanel];
    setPanels(updatedPanels);
    localStorage.setItem(
      "panels",
      JSON.stringify(
        updatedPanels.filter(
          (panel) => !examplePanels.some((ep) => ep.name === panel.name)
        )
      )
    );

    alert("Panel saved successfully!");
  };

  const loadPanel = (panelName: string) => {
    const panel = panels.find((p) => p.name === panelName);
    if (panel) {
      setPersonas(panel.personas);
      setProvider(panel.provider);
      setSelectedPanel(panelName);
      localStorage.setItem("personas", JSON.stringify(panel.personas));
      localStorage.setItem("provider", panel.provider);
    }
  };

  const handleAddPersona = (newPersona: Persona) => {
    const updatedPersonas = [...personas, newPersona];
    setPersonas(updatedPersonas);
    localStorage.setItem("personas", JSON.stringify(updatedPersonas));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100 p-4">
      <div className="container mx-auto max-w-3xl">
        <Header
          panels={panels}
          selectedPanel={selectedPanel}
          onSavePanel={savePanel}
          onLoadPanel={loadPanel}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="space-y-6">
          <TopicInput
            topic={topic}
            onTopicChange={setTopic}
            onGenerateResponses={handleGenerateResponses}
            isLoading={isLoading}
          />

          <AddPersonaForm onAddPersona={handleAddPersona} />

          <PersonaList
            personas={personas}
            onRemovePersona={(id) => {
              const updatedPersonas = personas.filter(
                (persona) => persona.id !== id
              );
              setPersonas(updatedPersonas);
              localStorage.setItem("personas", JSON.stringify(updatedPersonas));
            }}
            onUpdatePersonaContext={(id, context) => {
              const updatedPersonas = personas.map((persona) =>
                persona.id === id ? { ...persona, context } : persona
              );
              setPersonas(updatedPersonas);
              localStorage.setItem("personas", JSON.stringify(updatedPersonas));
            }}
          />

          <ResponseList responses={responses} isLoading={isLoading} />

          <SettingsDialog
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            apiKey={apiKey}
            provider={provider}
            onSave={handleSaveApiConfig}
          />
        </div>
      </div>
    </div>
  );
}
