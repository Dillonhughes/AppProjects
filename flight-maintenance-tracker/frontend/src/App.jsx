import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AircraftPage from './pages/AircraftPage';
import PartsPage from './pages/PartsPage';
import WorkOrdersPage from './pages/WorkOrdersPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Aircraft</Link> |{' '}
        <Link to="/parts">Parts</Link> |{' '}
        <Link to="/work-orders">Work Orders</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AircraftPage />} />
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/work-orders" element={<WorkOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
