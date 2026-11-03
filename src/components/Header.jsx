
import React from 'react';

export default function Header({ total, assistidos }) {
  return (
    <header className="header">
      <div className="header-content">

        <h1 className="logo">
          🎬 CineList
        </h1>

        <div className="header-stats">
          <span>📚 {total} cadastrados</span>
          <span>✅ {assistidos} assistidos</span>
        </div>

      </div>
    </header>
  );
}
