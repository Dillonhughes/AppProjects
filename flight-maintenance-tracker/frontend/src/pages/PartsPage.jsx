import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PartsPage() {
  const [parts, setParts] = useState([]);
  const [form, setForm] = useState({ part_number: '', part_name: '', quantity_in_stock: 0 });

  const loadParts = () => {
    axios.get('http://localhost:3001/parts').then(res => setParts(res.data));
  };

  useEffect(() => {
    loadParts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPart = async e => {
    e.preventDefault();
    await axios.post('http://localhost:3001/parts', form);
    setForm({ part_number: '', part_name: '', quantity_in_stock: 0 });
    loadParts();
  };

  return (
    <div>
      <h2>Parts</h2>
      <form onSubmit={addPart}>
        <input name="part_number" placeholder="Part Number" value={form.part_number} onChange={handleChange} />
        <input name="part_name" placeholder="Part Name" value={form.part_name} onChange={handleChange} />
        <input name="quantity_in_stock" type="number" placeholder="Qty" value={form.quantity_in_stock} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {parts.map(p => (
          <li key={p.id}>{p.part_number} - {p.part_name} (qty: {p.quantity_in_stock})</li>
        ))}
      </ul>
    </div>
  );
}
