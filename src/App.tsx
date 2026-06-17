import { useState } from 'react';
import './App.css';

import TrainingForm from './components/TrainingForm';
import TrainingList from './components/TrainingList';

import type { Training } from './components/TrainingList';

function App() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] =
    useState<Training | null>(null);

  const parseDate = (date: string): Date => {
    const [day, month, year] = date.split('.');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );
  };

  const sortTrainings = (
    items: Training[],
  ): Training[] => {
    return [...items].sort(
      (a, b) =>
        parseDate(b.date).getTime() -
        parseDate(a.date).getTime(),
    );
  };

  const handleSubmit = (
    date: string,
    distance: number,
  ) => {
    if (editingTraining) {
      const updated = trainings.map((item) =>
        item.id === editingTraining.id
          ? {
              ...item,
              date,
              distance,
            }
          : item,
      );

      setTrainings(sortTrainings(updated));
      setEditingTraining(null);

      return;
    }

    const existing = trainings.find(
      (item) => item.date === date,
    );

    if (existing) {
      const updated = trainings.map((item) =>
        item.date === date
          ? {
              ...item,
              distance: Number(
                (
                  item.distance + distance
                ).toFixed(1),
              ),
            }
          : item,
      );

      setTrainings(sortTrainings(updated));
    } else {
      const updated = [
        ...trainings,
        {
          id: crypto.randomUUID(),
          date,
          distance,
        },
      ];

      setTrainings(sortTrainings(updated));
    }
  };

  const handleDelete = (id: string) => {
    setTrainings((prev) =>
      prev.filter((item) => item.id !== id),
    );

    if (editingTraining?.id === id) {
      setEditingTraining(null);
    }
  };

  const handleEdit = (training: Training) => {
    setEditingTraining(training);
  };

  return (
    <div className="container">
      <TrainingForm
        onSubmit={handleSubmit}
        editingTraining={editingTraining}
      />

      <TrainingList
        trainings={trainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
