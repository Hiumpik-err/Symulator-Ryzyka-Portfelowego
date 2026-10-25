// 2. Zagregowane dane dla wstęgi ufności na wykresie liniowym (Fan Chart)
export interface PercentileBands {
  p5: number[];                 // 5. percentyl (scenariusz pesymistyczny / ryzyko)
  p25: number[];                // 25. percentyl
  p50: number[];                // 50. percentyl (mediana)
  p75: number[];                // 75. percentyl
  p95: number[];                // 95. percentyl (scenariusz optymistyczny)
}