import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [aircraft, setAircraft] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/aircraft').then(res => setAircraft(res.data));
  }, []);

  return (
    <div>
      <h1>Aircraft List</h1>
      <ul>
        {aircraft.map(a => (
          <li key={a.id}>{a.tail_number} - {a.model}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
