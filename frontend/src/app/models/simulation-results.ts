export interface SimulationResults {
    medianFinalValue: number;
    returnPercentage: number;
    valueAtRisk: number;
    confidenceLevel: number;
    profitProbability: number;
    samplePoints: number[];
    percentiles: {
        p5: number[];
        p25: number[];
        p50: number[];
        p75: number[];
        p95: number[];
    };
    histogram: {
        labels: string[];
        frequencies: number[];
        varCutoffIndex: number;
        varCutoffValue: number;
    };
}
