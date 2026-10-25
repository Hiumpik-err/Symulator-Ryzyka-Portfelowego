export interface SimulationParameters {
    initialCapital: number;
    timeHorizonDays: number;
    expectedReturn: number; // Annualized % (e.g. 8.0)
    volatility: number;     // Annualized % (e.g. 18.0)
    simulationCount: number;// N paths
    confidenceLevel: number; // e.g. 0.95 for 95% VaR
}
