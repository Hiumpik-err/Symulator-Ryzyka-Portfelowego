// 1. Parametry wejściowe wysyłane z formularza do backendu (DTO / Request Payload)
export interface SimulationParameters {
  initialCapital: number;       // Kapitał początkowy (np. 100 000)
  timeHorizonDays: number;      // Horyzont czasowy w dniach (np. 252)
  expectedReturn: number;       // Oczekiwana stopa zwrotu mu (%)
  volatility: number;           // Zmienność sigma (%)
  simulationCount: number;      // Liczba ścieżek N (np. 5000)
  confidenceLevel: number;      // Poziom ufności VaR (np. 0.95 dla 95%)
}