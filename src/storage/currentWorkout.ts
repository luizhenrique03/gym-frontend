const KEY = "currentWorkout";

export function getCurrentWorkout() {
  return Number(localStorage.getItem(KEY)) || 1;
}

export function setCurrentWorkout(id: number) {
  localStorage.setItem(KEY, String(id));
}

export function nextWorkout() {
  const current = getCurrentWorkout();
  setCurrentWorkout(current + 1);
}