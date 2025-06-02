import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function ParceriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    if (id) {
      api.get(`/parcerias/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/parcerias/${id}`, form);
    } else {
      await api.post('/parcerias', form);
    }
    navigate('/parcerias');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{id ? 'Editar Parceria' : 'Nova Parceria'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md">
        <label className="block mb-2">
          Nome:
          <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full border rounded p-2 mt-1" required />
        </label>
        <label className="block mb-4">
          Descrição:
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="w-full border rounded p-2 mt-1" required />
        </label>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
