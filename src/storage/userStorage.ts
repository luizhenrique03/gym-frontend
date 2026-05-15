const KEY = "user";

export type User = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthDate: string;
  cep: string;
  phone: string;
  plan?: string;
  photo?: string;
};

// ======================
// SALVAR USUÁRIO (com evento)
// ======================
export function saveUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));

  // 🔥 notifica a aplicação inteira
  window.dispatchEvent(new Event("userUpdated"));
}

// ======================
// PEGAR USUÁRIO
// ======================
export function getUser(): User | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

// ======================
// ATUALIZAR PARCIALMENTE
// ======================
export function updateUser(data: Partial<User>) {
  const current = getUser();
  if (!current) return;

  const updated = { ...current, ...data };

  localStorage.setItem(KEY, JSON.stringify(updated));

  // 🔥 notifica atualização também aqui
  window.dispatchEvent(new Event("userUpdated"));
}