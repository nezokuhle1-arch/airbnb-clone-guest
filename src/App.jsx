import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Location from './pages/Location';
import Home from './pages/Home';
import LocationDetails from './pages/LocationDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="location" element={<Location />} />
        <Route path="location/:id" element={<LocationDetails />} />
      </Route>
    </Routes>
  );
}

export default App;