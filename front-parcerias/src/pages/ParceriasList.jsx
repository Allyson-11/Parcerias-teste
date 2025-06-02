import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ParceriasList() {
  const [parcerias, setParcerias] = useState([]);

  useEffect(() => {
    api.get('/parcerias').then((res) => setParcerias(res.data));
  }, []);

  const removerParceria = async (id) => {
    if (confirm('Deseja realmente excluir esta parceria?')) {
      await api.delete(`/parcerias/${id}`);
      setParcerias(parcerias.filter((p) => p._id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Parcerias</h1>
      <Link to="/parcerias/nova" className="bg-gray-700 text-white px-4 py-2 rounded">Nova Parceria</Link>
      <ul className="mt-4 space-y-4">
        {parcerias.map((p) => (
          <li key={p._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{p.nome}</h2>
              <p>{p.descricao}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/parcerias/${p._id}`} className="text-blue-500">Ver</Link>
              <Link to={`/parcerias/editar/${p._id}`} className="text-yellow-600">Editar</Link>
              <button onClick={() => removerParceria(p._id)} className="text-red-500">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
