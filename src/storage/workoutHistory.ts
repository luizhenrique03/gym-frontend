export type WorkoutHistoryItem = {
  id: number;
  name: string;
  time: string;
  calories: number;
  date: number;
};

const KEY = "workout_history";

export function getHistory(): WorkoutHistoryItem[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveHistory(item: WorkoutHistoryItem) {
  const current = getHistory();

  const updated = [item, ...current];

  localStorage.setItem(KEY, JSON.stringify(updated));
}