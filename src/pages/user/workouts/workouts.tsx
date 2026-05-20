import { workouts } from "../../../data/mockWorkouts";
import WorkoutCard from "../../../components/WorkoutCard/WorkoutCard";
import "./Workouts.css";
import { useNavigate } from "react-router-dom";

type Exercise = {
  id: number;
  name: string;
  sets: string;
  calories: number;
};

type Workout = {
  id: number;
  name: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
};

export default function Workouts() {

  const navigate = useNavigate();

  function getTotalCalories(workout: Workout) {
    return workout.exercises.reduce(
      (total, ex) => total + ex.calories,
      0
    );
  }

  return (
    <div>
     

      <div className="workouts-page">

        <h1>Meus Treinos 💪</h1>

        <div className="workouts-grid">

          {workouts.map((workout: Workout) => (
            <WorkoutCard
              key={workout.id}
              name={workout.name}
              focus={workout.focus}
              duration={workout.duration}
              calories={getTotalCalories(workout) + " kcal"}
              onClick={() => navigate(`/workouts/${workout.id}`)}
            />
          ))}

        </div>

      </div>
    </div>
  );
}