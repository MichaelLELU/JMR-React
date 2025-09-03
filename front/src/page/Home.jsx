"use client";

import { gql, useQuery } from "@apollo/client";

const GET_RECETES = gql`
  query GetRecetes {
    getRecetes {
      id
      name
      globalTime
      picture
      instructions
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_RECETES);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const recetes = data?.getRecetes ?? [];

  return (
    <main>
      <h1>Toutes les recettes</h1>

      {recetes.length === 0 && <p>Aucune recette pour le moment.</p>}

      <ul>
        {recetes.map((r) => (
          <li key={r.id ?? r.name}>
            {r.picture && <img src={r.picture} alt={r.name} />}
            <div>
              <h2>{r.name}</h2>
              {r.globalTime && <p>⏱️ {r.globalTime}</p>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
