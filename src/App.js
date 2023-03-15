import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListJobs from './components/ListJobs';
import DetailJobs from './components/DetailJobs';
import Login from './pages/Login';
import AuthChecker from './components/AuthChecker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthChecker>
              {' '}
              <ListJobs />
            </AuthChecker>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <AuthChecker>
              {' '}
              <DetailJobs />
            </AuthChecker>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
