import { useState } from 'react';
import TrainingForm from './components/TrainingForm';
import TrainingList from './components/TrainingList';
import type { FormData, Training } from './components/TrainingList';

import './App.css';

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${day}.${month}.${year}`;
};

const parseDate = (date: string) => {
  const [day, month, year] = date.split('.');

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
};

const convertToInputDate = (date: string) => {
  const [day, month, year] = date.split('.');

  return `${year}-${month}-${day}`;
};

export default function App() {
  const [formData, setFormData] =
    useState<FormData>({
      date: '',
      distance: '',
    });

  const [trainings, setTrainings] =
    useState<Training[]>([]);

  const handleSubmit = () => {
    if (!formData.date || !formData.distance) {
      return;
    }

    const distance = Number(formData.distance);

    if (distance <= 0 || Number.isNaN(distance)) {
      alert('Введите корректное значение километража');
       return;
    }

    const formattedDate = formatDate(
      formData.date
    );

    setTrainings((prev) => {
      const existing = prev.find(
        (item) => item.date === formattedDate
      );

      let result: Training[];

      if (existing) {
        result = prev.map((item) =>
          item.date === formattedDate
            ? {
                ...item,
                distance: (
                  Number(item.distance) +
                  Number(formData.distance)
                ).toString(),
              }
            : item
        );
      } else {
        result = [
          ...prev,
          {
            id: Date.now().toString(),
            date: formattedDate,
            distance: formData.distance,
          },
        ];
      }

      return result.sort(
        (a, b) =>
          parseDate(b.date).getTime() -
          parseDate(a.date).getTime()
      );
    });

    setFormData({
      date: '',
      distance: '',
    });
  };

  const handleDelete = (id: string) => {
    setTrainings((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (
    training: Training
  ) => {
    setFormData({
      date: convertToInputDate(
        training.date
      ),
      distance: training.distance,
    });

    setTrainings((prev) =>
      prev.filter(
        (item) => item.id !== training.id
      )
    );
  };

  return (
    <div className="container">
      <TrainingForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      <TrainingList
        trainings={trainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
