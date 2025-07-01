const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Aircraft CRUD
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

app.put('/aircraft/:id', async (req, res) => {
  const { id } = req.params;
  const { tail_number, model, status } = req.body;
  await pool.query(
    'UPDATE aircraft SET tail_number=?, model=?, status=? WHERE id=?',
    [tail_number, model, status, id]
  );
  res.json({ success: true });
});

app.delete('/aircraft/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM aircraft WHERE id=?', [id]);
  res.json({ success: true });
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

app.put('/parts/:id', async (req, res) => {
  const { id } = req.params;
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
  await pool.query(
    'UPDATE parts_inventory SET part_number=?, part_name=?, category=?, supplier=?, cost_per_unit=?, quantity_in_stock=?, purchase_date=?, tags=? WHERE id=?',
    [
      part_number,
      part_name,
      category,
      supplier,
      cost_per_unit,
      quantity_in_stock,
      purchase_date,
      tags,
      id,
    ]
  );
  res.json({ success: true });
});

app.delete('/parts/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM parts_inventory WHERE id=?', [id]);
  res.json({ success: true });
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

app.get('/work-orders', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM work_orders');
  res.json(rows);
});

app.put('/work-orders/:id', async (req, res) => {
  const { id } = req.params;
  const { aircraft_id, description, status, priority, due_date } = req.body;
  await pool.query(
    'UPDATE work_orders SET aircraft_id=?, description=?, status=?, priority=?, due_date=? WHERE id=?',
    [aircraft_id, description, status, priority, due_date, id]
  );
  res.json({ success: true });
});

app.delete('/work-orders/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM work_orders WHERE id=?', [id]);
  res.json({ success: true });
});

app.post('/labor', async (req, res) => {
  const { work_order_id, technician_name, hours, cost } = req.body;
  const [result] = await pool.query(
    'INSERT INTO labor_logs (work_order_id, technician_name, hours, cost) VALUES (?,?,?,?)',
    [work_order_id, technician_name, hours, cost]
  );
  res.json({ id: result.insertId });
});

app.get('/reports/aircraft/:id', async (req, res) => {
  const { id } = req.params;
  const [aircraft] = await pool.query('SELECT * FROM aircraft WHERE id = ?', [id]);
  const [parts] = await pool.query('SELECT * FROM parts_used WHERE aircraft_id = ?', [id]);
  const [workOrders] = await pool.query('SELECT * FROM work_orders WHERE aircraft_id = ?', [id]);
  const [labor] = await pool.query(
    'SELECT l.* FROM labor_logs l JOIN work_orders w ON l.work_order_id=w.id WHERE w.aircraft_id=?',
    [id]
  );
  res.json({ aircraft: aircraft[0], parts, workOrders, labor });
});

app.get('/reports/shop', async (req, res) => {
  const [inventory] = await pool.query('SELECT * FROM parts_inventory');
  const [purchases] = await pool.query('SELECT SUM(cost_per_unit * quantity_in_stock) as value FROM parts_inventory');
  res.json({ inventory, totalInventoryValue: purchases[0].value });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
