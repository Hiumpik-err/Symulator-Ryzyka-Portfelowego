import { SimulationParameters } from "./simulation-parameters";

// 5. Opcjonalnie: Zapisany scenariusz symulacji (do persystencji w bazie danych)
export interface SavedScenario {
  id: string;
  name: string;
  createdAt: Date;
  parameters: SimulationParameters;
}