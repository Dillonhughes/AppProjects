import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WorkOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ aircraft_id: '', description: '', status: 'Open', priority: 'Normal', due_date: '' });

  const loadOrders = () => {
    axios.get('http://localhost:3001/work-orders').then(res => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrder = async e => {
    e.preventDefault();
    await axios.post('http://localhost:3001/work-orders', form);
    setForm({ aircraft_id: '', description: '', status: 'Open', priority: 'Normal', due_date: '' });
    loadOrders();
  };

  return (
    <div>
      <h2>Work Orders</h2>
      <form onSubmit={addOrder}>
        <input name="aircraft_id" placeholder="Aircraft ID" value={form.aircraft_id} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="priority" placeholder="Priority" value={form.priority} onChange={handleChange} />
        <input name="due_date" type="date" value={form.due_date} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {orders.map(o => (
          <li key={o.id}>{o.description} (aircraft {o.aircraft_id}) - {o.status}</li>
        ))}
      </ul>
    </div>
  );
}
