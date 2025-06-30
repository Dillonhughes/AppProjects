const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Basic CRUD endpoints
app.get('/aircraft', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM aircraft');
  res.json(rows);
});

app.post('/aircraft', async (req, res) => {
  const { tail_number, model, status } = req.body;
  const [result] = await pool.query(
    'INSERT INTO aircraft (tail_number, model, status) VALUES (?, ?, ?)',
    [tail_number, model, status]
  );
  res.json({ id: result.insertId });
});

app.get('/parts', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM parts_inventory');
  res.json(rows);
});

app.post('/parts', async (req, res) => {
  const {
    part_number,
    part_name,
    category,
    supplier,
    cost_per_unit,
    quantity_in_stock,
    purchase_date,
    tags,
  } = req.body;
  const [result] = await pool.query(
    'INSERT INTO parts_inventory (part_number, part_name, category, supplier, cost_per_unit, quantity_in_stock, purchase_date, tags) VALUES (?,?,?,?,?,?,?,?)',
    [part_number, part_name, category, supplier, cost_per_unit, quantity_in_stock, purchase_date, tags]
  );
  res.json({ id: result.insertId });
});

app.post('/assign-part', async (req, res) => {
  const { aircraft_id, part_id, quantity_used } = req.body;
  await pool.query('INSERT INTO parts_used (aircraft_id, part_id, quantity_used, used_date) VALUES (?,?,?,NOW())', [aircraft_id, part_id, quantity_used]);
  await pool.query('UPDATE parts_inventory SET quantity_in_stock = quantity_in_stock - ? WHERE id = ?', [quantity_used, part_id]);
  res.json({ success: true });
});

app.post('/work-orders', async (req, res) => {
  const { aircraft_id, description, status, priority, due_date } = req.body;
  const [result] = await pool.query(
    'INSERT INTO work_orders (aircraft_id, description, status, priority, due_date) VALUES (?,?,?,?,?)',
    [aircraft_id, description, status, priority, due_date]
  );
  res.json({ id: result.insertId });
});

app.get('/reports/aircraft/:id', async (req, res) => {
  const { id } = req.params;
  const [aircraft] = await pool.query('SELECT * FROM aircraft WHERE id = ?', [id]);
  const [parts] = await pool.query('SELECT * FROM parts_used WHERE aircraft_id = ?', [id]);
  const [workOrders] = await pool.query('SELECT * FROM work_orders WHERE aircraft_id = ?', [id]);
  res.json({ aircraft: aircraft[0], parts, workOrders });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
