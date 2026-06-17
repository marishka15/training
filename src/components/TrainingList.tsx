export interface Training {
  id: string;
  date: string;
  distance: number;
}

interface Props {
  trainings: Training[];

  onDelete: (id: string) => void;

  onEdit: (training: Training) => void;
}

export default function TrainingList({
  trainings,
  onDelete,
  onEdit,
}: Props) {
  return (
    <>
      <div className="header">
        <span>Дата (ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>

      <div className="table">
        {trainings.map((item) => (
          <div
            className="row"
            key={item.id}
          >
            <span>{item.date}</span>

            <span>{item.distance}</span>

            <span>
              <button
                type="button"
                onClick={() => onEdit(item)}
              >
                ✎
              </button>

              <button
                type="button"
                onClick={() =>
                  onDelete(item.id)
                }
              >
                ✘
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
