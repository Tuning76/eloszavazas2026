import React, { useState, useEffect } from 'react';

const parties = [
  'Fidesz–KDNP', 'TISZA Párt', 'DK', 'Momentum',
  'Mi Hazánk', 'MKKP', 'Jobbik', 'LMP', 'MSZP',
  'Párbeszéd', 'Egyéb'
];

function App() {
  const [hasVoted, setHasVoted] = useState(() => localStorage.getItem('votedParty') !== null);
  const [votes, setVotes] = useState(() => {
    const stored = localStorage.getItem('votes');
    return stored ? JSON.parse(stored) : parties.reduce((acc, party) => {
      acc[party] = 0;
      return acc;
    }, {});
  });

  const vote = (party) => {
    if (hasVoted) return;
    const updatedVotes = { ...votes, [party]: votes[party] + 1 };
    localStorage.setItem('votes', JSON.stringify(updatedVotes));
    localStorage.setItem('votedParty', party);
    setVotes(updatedVotes);
    setHasVoted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Szavazás 2026</h1>
      {!hasVoted ? (
        <div>
          <p>Kérlek, szavazz egy pártra:</p>
          {parties.map((party) => (
            <button key={party} onClick={() => vote(party)} style={{ margin: '0.5rem' }}>
              {party}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Köszönjük a szavazatodat!</h2>
          <h3>Aktuális eredmények:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(votes).map(([party, count]) => (
              <li key={party}>{party}: {count} szavazat</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
