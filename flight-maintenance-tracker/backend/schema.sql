-- Database schema for Flight Maintenance Tracker

CREATE TABLE IF NOT EXISTS aircraft (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tail_number VARCHAR(10) NOT NULL,
  model VARCHAR(50),
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS parts_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  part_number VARCHAR(50),
  part_name VARCHAR(100),
  category VARCHAR(50),
  supplier VARCHAR(100),
  cost_per_unit DECIMAL(10,2),
  quantity_in_stock INT,
  purchase_date DATE,
  tags TEXT
);

CREATE TABLE IF NOT EXISTS parts_used (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aircraft_id INT,
  part_id INT,
  quantity_used INT,
  used_date DATETIME,
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(id),
  FOREIGN KEY (part_id) REFERENCES parts_inventory(id)
);

CREATE TABLE IF NOT EXISTS work_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aircraft_id INT,
  description TEXT,
  status VARCHAR(20),
  priority VARCHAR(20),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(id)
);

CREATE TABLE IF NOT EXISTS labor_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_order_id INT,
  technician_name VARCHAR(100),
  hours DECIMAL(5,2),
  cost DECIMAL(10,2),
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (work_order_id) REFERENCES work_orders(id)
);
