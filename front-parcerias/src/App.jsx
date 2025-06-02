import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParceriasList from './pages/ParceriasList';
import ParceriaForm from './pages/ParceriaForm';
import ParceriaView from './pages/ParceriaView';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parcerias" element={<ParceriasList />} />
          <Route path="/parcerias/nova" element={<ParceriaForm />} />
          <Route path="/parcerias/editar/:id" element={<ParceriaForm />} />
          <Route path="/parcerias/:id" element={<ParceriaView />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
