import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState([]);
  const [form, setForm] = useState({ tail_number: '', model: '', status: '' });

  const loadAircraft = () => {
    axios.get('http://localhost:3001/aircraft').then(res => setAircraft(res.data));
  };

  useEffect(() => {
    loadAircraft();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAircraft = async e => {
    e.preventDefault();
    await axios.post('http://localhost:3001/aircraft', form);
    setForm({ tail_number: '', model: '', status: '' });
    loadAircraft();
  };

  return (
    <div>
      <h2>Aircraft</h2>
      <form onSubmit={addAircraft}>
        <input name="tail_number" placeholder="Tail Number" value={form.tail_number} onChange={handleChange} />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {aircraft.map(a => (
          <li key={a.id}>{a.tail_number} - {a.model} ({a.status})</li>
        ))}
      </ul>
    </div>
  );
}
