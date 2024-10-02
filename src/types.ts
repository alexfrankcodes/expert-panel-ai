export type Persona = {
  id: string;
  name: string;
  description: string;
  context: string;
};

export type Response = {
  personaName: string;
  content: string;
};

export interface Panel {
  name: string;
  personas: Persona[];
  provider: string;
}
