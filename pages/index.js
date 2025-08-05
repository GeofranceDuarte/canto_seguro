
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
  <section style="padding: 2rem; font-family: Arial, sans-serif;">
  <h2 style="text-align: center; font-size: 2rem; margin-bottom: 1rem;">🌍 Ligas com Oportunidade – Cantos Seguros</h2>

  <div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center;">

    <!-- Bloco 1: Mercado de Escanteios -->
    <div style="flex: 1; min-width: 320px; background-color: #e3f2fd; padding: 1.5rem; border-radius: 12px;">
      <h3 style="color: #1565c0;">📈 Mercado de Escanteios</h3>
      <ul style="list-style: none; padding-left: 0; font-size: 1rem;">
        <li>🇵🇱 <strong>Polônia – I Liga</strong> (~11.26)</li>
        <li>🏴 <strong>Escócia – Premiership</strong> (~11.25)</li>
        <li>🇱🇻 <strong>Letônia – 1. Liga</strong> (~11.11)</li>
        <li>🇳🇴 <strong>Noruega – Division 1</strong> (~11.08)</li>
        <li>🇸🇪 <strong>Suécia – Allsvenskan</strong> (~10.90)</li>
        <li>🇮🇸 <strong>Islândia – Urvalsdeild</strong> (~12.1)</li>
        <li>🇪🇪 <strong>Estônia – Meistriliiga</strong> (~11.3)</li>
        <li>🌊 <strong>OFC Champions League</strong> (~10)</li>
        <li>🌏 <strong>Qualificação Copa – Ásia</strong> (~7–8)</li>
      </ul>
    </div>

    <!-- Bloco 2: Mercado de Gols -->
    <div style="flex: 1; min-width: 320px; background-color: #f1f8e9; padding: 1.5rem; border-radius: 12px;">
      <h3 style="color: #33691e;">⚽ Mercado de Gols (Over 1.5+)</h3>
      <ul style="list-style: none; padding-left: 0; font-size: 1rem;">
        <li>🇮🇸 <strong>Islândia – 1. Deild Karla</strong> (~3.1)</li>
        <li>🇫🇮 <strong>Finlândia – Ykkönen</strong> (~2.8)</li>
        <li>🇸🇪 <strong>Suécia – Superettan</strong> (~2.7)</li>
        <li>🇦🇱 <strong>Albânia – Kategoria Superiore</strong> (~2.6)</li>
        <li>🇱🇻 <strong>Letônia – Virsliga</strong> (~2.6–2.8)</li>
        <li>🇪🇪 <strong>Estônia – Meistriliiga</strong> (~2.5)</li>
        <li>🌊 <strong>OFC Champions League</strong> (~2.6–3.2)</li>
        <li>🇧🇾 <strong>Bielorrússia – Vysshaya Liga</strong> (~2.5–2.7)</li>
      </ul>
    </div>

  </div>
</section>

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
