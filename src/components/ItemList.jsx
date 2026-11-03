
import React from 'react';

export default function ItemList({ filmes, onAlterar, onExcluir }) {

  if (filmes.length === 0) {
    return (
      <div className="empty">
        <h3>🍿 Nenhum título encontrado</h3>
        <p>Adicione um filme ou selecione outro filtro.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">

      {filmes.map((filme) => (
        <article className="movie-card" key={filme.id}>

          <div className="movie-icon">
            {filme.tipo === 'Filme' ? '🎬' : '📺'}
          </div>

          <span className="movie-type">
            {filme.tipo}
          </span>

          <h3>{filme.titulo}</h3>

          <p className="genre">{filme.genero}</p>

          <span
            className={
              filme.status === 'Já assisti'
                ? 'status watched'
                : 'status pending'
            }
          >
            {filme.status}
          </span>

          <div className="card-actions">

            <button
              type="button"
              className="btn-toggle"
              onClick={() => onAlterar(filme.id)}
            >
              Alterar status
            </button>

            <button
              type="button"
              className="btn-delete"
              onClick={() => onExcluir(filme.id)}
            >
              Excluir
            </button>

          </div>

        </article>
      ))}

    </div>
  );
}
