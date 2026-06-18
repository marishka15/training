import type { FormData } from './TrainingList';

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
};

export default function TrainingForm({
  formData,
  setFormData,
  onSubmit,
}: Props) {
  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="form">
      <div className="field">
        <label>Дата</label>
        <input
          type="date"
          value={formData.date}
          onChange={handleChange('date')}
        />
      </div>

      <div className="field">
        <label>Дистанция (км)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={formData.distance}
          onChange={handleChange('distance')}
        />
      </div>

      <button className="btn" onClick={onSubmit}>
        Сохранить
      </button>
    </div>
  );
}
