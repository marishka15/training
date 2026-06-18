export type FormData = {
  date: string;
  distance: string;
};

export type Training = {
  id: string;
  date: string;
  distance: string;
};

type Props = {
  trainings: Training[];
  onDelete: (id: string) => void;
  onEdit: (training: Training) => void;
};

export default function TrainingList({
  trainings,
  onDelete,
  onEdit,
}: Props) {
  return (
    <>
      <div className="list">
        <span>Дата (ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>

      <div className="table">
        {trainings.map((training) => (
          <div key={training.id} className="row">
            <span>{training.date}</span>

            <span>{training.distance}</span>

            <span>
              <button
                onClick={() => onEdit(training)}
              >
                ✎
              </button>

              <button
                onClick={() => onDelete(training.id)}
              >
                ✖
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
