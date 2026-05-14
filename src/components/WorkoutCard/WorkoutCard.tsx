type Props = {
  name: string;
  focus: string;
  duration: string;
  calories: string;

  onClick?: () => void;
};

export default function WorkoutCard({
  name,
  focus,
  duration,
  calories,
  onClick,
}: Props) {

  return (
    <div className="workout-card" onClick={onClick}>

      <h2>🏋️ {name}</h2>

      <p>{focus}</p>

      <div className="workout-info">

        <span>⏱ {duration}</span>

        <span>🔥 {calories}</span>
      </div>

    </div>
  );
}