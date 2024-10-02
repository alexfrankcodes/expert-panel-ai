import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Response } from "@/types";
import { Download } from "lucide-react";

type ResponseListProps = {
  responses: Response[];
  isLoading: boolean;
};

export function ResponseList({ responses, isLoading }: ResponseListProps) {
  const downloadResponses = (format: "markdown" | "json" | "text") => {
    let content = "";
    let filename = `expert_responses_${Date.now()}.`;
    let mimeType = "";

    switch (format) {
      case "markdown":
        content = responses
          .map((r) => `## ${r.personaName}\n\n${r.content}\n\n`)
          .join("---\n\n");
        filename += "md";
        mimeType = "text/markdown";
        break;
      case "json":
        content = JSON.stringify({ responses }, null, 2);
        filename += "json";
        mimeType = "application/json";
        break;
      case "text":
        content = responses
          .map((r) => `${r.personaName}:\n${r.content}\n\n`)
          .join("");
        filename += "txt";
        mimeType = "text/plain";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <Card className="bg-secondary bg-opacity-50 backdrop-filter backdrop-blur-lg border-secondary">
          <CardContent className="p-4">
            <p className="text-neutral-300 text-center">
              Generating responses...
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {responses.map((response, index) => (
            <Card
              key={index}
              className="bg-secondary bg-opacity-50 backdrop-filter backdrop-blur-lg border-secondary"
            >
              <CardContent className="p-4">
                <h3 className="font-bold text-accent mb-2">
                  {response.personaName}
                </h3>
                <p className="text-neutral-300">{response.content}</p>
              </CardContent>
            </Card>
          ))}
          {responses.length > 0 && (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-secondary border-secondary text-primary hover:bg-secondary-hover"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Responses
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary border-secondary">
                  <DropdownMenuItem
                    onClick={() => downloadResponses("markdown")}
                    className="text-neutral-200 hover:bg-secondary-hover cursor-pointer"
                  >
                    Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => downloadResponses("json")}
                    className="text-neutral-200 hover:bg-secondary-hover cursor-pointer"
                  >
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => downloadResponses("text")}
                    className="text-neutral-200 hover:bg-secondary-hover cursor-pointer"
                  >
                    Plain Text
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
      )}
    </div>
  );
}
