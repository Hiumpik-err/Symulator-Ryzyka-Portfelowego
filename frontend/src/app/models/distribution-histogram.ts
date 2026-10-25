// 3. Dane do histogramu rozkładu końcowego wartości portfela
export interface DistributionHistogram {
  labels: string[];             // Etykiety przedziałów/koszyków (np. "$90k", "$100k")
  frequencies: number[];        // Liczba symulacji w danym przedziale
  varCutoffIndex: number;       // Indeks koszyka, w którym następuje odcięcie VaR (dla oznaczenia koloru)
  varCutoffValue: number;       // Wartość graniczna w PLN/USD dla odcięcia VaR
}