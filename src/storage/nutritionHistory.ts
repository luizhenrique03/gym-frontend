const KEY = "nutrition_history";

export type NutritionEntry = {
  date: string; // YYYY-MM-DD
  calories: number;
  protein: number;
  carbs: number;
  water: number;
};

export function getNutritionHistory(): NutritionEntry[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

// sobrescreve o dia atual (não duplica)
export function saveNutrition(entry: NutritionEntry) {
  const history = getNutritionHistory();

  const filtered = history.filter((h) => h.date !== entry.date);

  const updated = [entry, ...filtered];

  localStorage.setItem(KEY, JSON.stringify(updated));
}