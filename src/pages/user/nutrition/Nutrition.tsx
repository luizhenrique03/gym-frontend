
import "./Nutrition.css";
import { useMemo, useState, useEffect } from "react";
import { saveNutrition } from "../../../storage/nutritionHistory";

type Meal = {
  id: number;
  title: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
};

const meals: Meal[] = [
  {
    id: 1,
    title: "Café da manhã",
    foods: ["2 ovos mexidos", "2 fatias pão integral", "1 banana"],
    calories: 450,
    protein: 25,
    carbs: 40,
  },
  {
    id: 2,
    title: "Almoço",
    foods: ["150g frango", "100g arroz", "Salada"],
    calories: 700,
    protein: 55,
    carbs: 80,
  },
  {
    id: 3,
    title: "Jantar",
    foods: ["150g peixe", "Batata doce", "Legumes"],
    calories: 500,
    protein: 40,
    carbs: 60,
  },
];

export default function Nutrition() {
  // ======================
  // RESET DIÁRIO (CORRIGIDO)
  // ======================
  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const savedDate = localStorage.getItem("nutrition_date");

    if (savedDate !== todayKey) {
      localStorage.removeItem("completed_meals");
      localStorage.removeItem("water");
      localStorage.setItem("nutrition_date", todayKey);
    }
  }, []);

  // ======================
  // STATES
  // ======================
  const [completedMeals, setCompletedMeals] = useState<number[]>(() => {
    const saved = localStorage.getItem("completed_meals");
    return saved ? JSON.parse(saved) : [];
  });

  const [water, setWater] = useState<number>(() => {
    const saved = localStorage.getItem("water");
    return saved ? Number(saved) : 0;
  });

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<string[]>([
    "Olá Luiz 👋",
    "Como posso ajudar sua dieta hoje?",
  ]);

  // ======================
  // LOCAL STORAGE HELPERS
  // ======================
  function updateMeals(data: number[]) {
    setCompletedMeals(data);
    localStorage.setItem("completed_meals", JSON.stringify(data));
  }

  function updateWater(value: number) {
    setWater(value);
    localStorage.setItem("water", String(value));
  }

  // ======================
  // SYNC COM DASHBOARD
  // ======================
  function syncNutrition(updatedMeals: number[], updatedWater: number) {
    const filtered = meals.filter((m) => updatedMeals.includes(m.id));

    const calories = filtered.reduce((t, m) => t + m.calories, 0);
    const protein = filtered.reduce((t, m) => t + m.protein, 0);
    const carbs = filtered.reduce((t, m) => t + m.carbs, 0);

    const todayKey = new Date().toISOString().split("T")[0];

    saveNutrition({
      date: todayKey,
      calories,
      protein,
      carbs,
      water: updatedWater,
    });
  }

  // ======================
  // TOGGLE MEAL
  // ======================
  function toggleMeal(id: number) {
    let updated: number[];

    if (completedMeals.includes(id)) {
      updated = completedMeals.filter((m) => m !== id);
    } else {
      updated = [...completedMeals, id];
    }

    updateMeals(updated);
    syncNutrition(updated, water);
  }

  // ======================
  // ÁGUA
  // ======================
  function addWater() {
    const updated = water + 250;

    updateWater(updated);
    syncNutrition(completedMeals, updated);
  }

  // ======================
  // IA MOCK
  // ======================
  function sendMessage() {
    if (!message.trim()) return;

    const lower = message.toLowerCase();

    let response = "Ainda estou aprendendo 🤖";

    if (lower.includes("hipertrofia")) {
      response = "Foque em proteína alta e superávit calórico 💪";
    } else if (lower.includes("emagrecer")) {
      response = "Mantenha déficit calórico e proteína alta 🔥";
    } else if (lower.includes("água")) {
      response = "Hidratação melhora performance 💧";
    }

    setMessages((prev) => [
      ...prev,
      `Você: ${message}`,
      `IA: ${response}`,
    ]);

    setMessage("");
  }

  // ======================
  // MÉTRICAS DO DIA
  // ======================
  const totalCalories = useMemo(() => {
    return meals
      .filter((m) => completedMeals.includes(m.id))
      .reduce((t, m) => t + m.calories, 0);
  }, [completedMeals]);

  const totalProtein = useMemo(() => {
    return meals
      .filter((m) => completedMeals.includes(m.id))
      .reduce((t, m) => t + m.protein, 0);
  }, [completedMeals]);

  const waterPercent = Math.min((water / 3000) * 100, 100);

  // ======================
  // UI
  // ======================
  return (
    

      <div className="nutrition-page">
        <div className="nutrition-header">
          <h1>Nutrição 🥗</h1>
          <p>Acompanhe sua alimentação diária.</p>
        </div>

        <div className="nutrition-stats">
          <div className="nutrition-card">
            <span>🔥 Calorias</span>
            <h2>{totalCalories}</h2>
            <small>Hoje</small>
          </div>

          <div className="nutrition-card">
            <span>🍗 Proteína</span>
            <h2>{totalProtein}g</h2>
            <small>Hoje</small>
          </div>

          <div className="nutrition-card">
            <span>💧 Água</span>
            <h2>{(water / 1000).toFixed(1)}L</h2>
            <small>Hoje</small>
          </div>
        </div>

        <div className="nutrition-content">
          <div className="nutrition-left">
            <div className="nutrition-box">
              <h2>Plano alimentar 🍽️</h2>

              {meals.map((meal) => {
                const completed = completedMeals.includes(meal.id);

                return (
                  <div
                    key={meal.id}
                    className={`meal-card ${completed ? "meal-completed" : ""}`}
                  >
                    <div className="meal-top">
                      <h3>{meal.title}</h3>

                      <button onClick={() => toggleMeal(meal.id)}>
                        {completed ? "Concluído" : "Concluir"}
                      </button>
                    </div>

                    {meal.foods.map((food) => (
                      <p key={food}>{food}</p>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="nutrition-box">
              <div className="water-header">
                <h2>Água 💧</h2>
                <span>{(water / 1000).toFixed(1)}L / 3L</span>
              </div>

              <div className="water-bar">
                <div
                  className="water-progress"
                  style={{ width: `${waterPercent}%` }}
                />
              </div>

              <button className="water-button" onClick={addWater}>
                +250ml
              </button>
            </div>
          </div>

          <div className="nutrition-right">
            <div className="ai-card">
              <h2>IA Nutricional 🤖</h2>

              <div className="ai-messages">
                {messages.map((msg, i) => (
                  <div key={i} className="ai-message">
                    {msg}
                  </div>
                ))}
              </div>

              <div className="ai-input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua pergunta..."
                />
                <button onClick={sendMessage}>Enviar</button>
              </div>
            </div>

            <div className="tip-card">
              <h2>Dica do dia 💡</h2>
              <p>Consistência diária é mais importante que intensidade.</p>
            </div>
          </div>
        </div>
      </div>
  );
}