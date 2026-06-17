import { useEffect, useState } from 'react';

import type { Training } from './TrainingList';

interface Props {
  onSubmit: (
    date: string,
    distance: number,
  ) => void;

  editingTraining: Training | null;
}

export default function TrainingForm({
  onSubmit,
  editingTraining,
}: Props) {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (editingTraining) {
      setDate(editingTraining.date);
      setDistance(
        editingTraining.distance.toString(),
      );
    }
  }, [editingTraining]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!date || !distance) {
      return;
    }

    onSubmit(date, Number(distance));

    setDate('');
    setDistance('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div>
        <label>Дата (ДД.ММ.ГГ)</label>

        <input
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />
      </div>

      <div>
        <label>Пройдено км</label>

        <input
          type="number"
          step="0.1"
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value)
          }
        />
      </div>

      <button type="submit">
        {editingTraining
          ? 'Сохранить'
          : 'OK'}
      </button>
    </form>
  );
}
