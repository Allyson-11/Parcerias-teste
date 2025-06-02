import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function ParceriaView() {
  const { id } = useParams();
  const [parceria, setParceria] = useState(null);

  useEffect(() => {
    api.get(`/parcerias/${id}`).then((res) => setParceria(res.data));
  }, [id]);

  if (!parceria) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{parceria.nome}</h1>
      <p className="mb-4">{parceria.descricao}</p>
      <Link to="/parcerias" className="text-blue-500">Voltar</Link>
    </div>
  );
}
