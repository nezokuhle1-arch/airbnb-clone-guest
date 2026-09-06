import LocationDetails from '../pages/LocationDetails';
import Layout from '../components/Layout';
import { Routes, Route } from 'react-router-dom';

function Location() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LocationDetails />} />
        </Route>
      </Routes>
    );
  }
  
  export default Location;