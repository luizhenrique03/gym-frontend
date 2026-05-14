const STORAGE_KEY = "confirmed_classes";

export function savePresence(classId: number) {

  const current = getPresence();

  if (!current.includes(classId)) {

    current.push(classId);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(current)
    );
  }
}

export function removePresence(classId: number) {

  const current = getPresence();

  const updated = current.filter(
    (id) => id !== classId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}

export function getPresence(): number[] {

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function hasConfirmed(classId: number) {

  const confirmed = getPresence();

  return confirmed.includes(classId);
}