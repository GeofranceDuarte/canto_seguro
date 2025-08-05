
import { useState } from 'react';

export default function Home() {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [totals, setTotals] = useState('');
  const [result, setResult] = useState(null);

  const calcular = () => {
    const jogos = totals.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const total = jogos.length;
    if (total === 0) return;
    const medias = {
      casa: parseFloat(home) / 5,
      fora: parseFloat(away) / 5,
      combinada: (parseFloat(home) + parseFloat(away)) / 10,
    };
    const linhas = Array.from({ length: 12 }, (_, i) => i + 3.5);
    const probs = linhas.map(linha => {
      const over = jogos.filter(j => j > linha).length;
      const under = jogos.filter(j => j <= linha).length;
      return {
        linha,
        over: ((over / total) * 100).toFixed(1),
        under: ((under / total) * 100).toFixed(1),
      };
    });
    setResult({ medias, probs });
  };
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Canto Seguro</h1>
      <div className="space-y-2">
        <input className="w-full p-2 border rounded" placeholder="Escanteios mandante (5 jogos)" value={home} onChange={e => setHome(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Escanteios visitante (5 jogos)" value={away} onChange={e => setAway(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Totais FT dos últimos jogos (ex: 9,10,11...)" value={totals} onChange={e => setTotals(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded" onClick={calcular}>Calcular</button>
      </div>
      {result && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Média Casa:</strong> {result.medias.casa.toFixed(2)}</p>
            <p><strong>Média Visitante:</strong> {result.medias.fora.toFixed(2)}</p>
            <p><strong>Média Combinada:</strong> {result.medias.combinada.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {result.probs.map(p => (
              <div key={p.linha} className="border p-2 rounded bg-white shadow-sm">
                <strong>Over {p.linha}:</strong> {p.over}%<br />
                <strong>Under {p.linha}:</strong> {p.under}%
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
