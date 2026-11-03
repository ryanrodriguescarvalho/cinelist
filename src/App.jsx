
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AddForm from './components/AddForm.jsx';
import ItemList from './components/ItemList.jsx';

const filmesIniciais = [
  {
    id: 'filme-1',
    titulo: 'Interestelar',
    genero: 'Ficção científica',
    tipo: 'Filme',
    status: 'Já assisti'
  },
  {
    id: 'filme-2',
    titulo: 'Stranger Things',
    genero: 'Suspense',
    tipo: 'Série',
    status: 'Quero assistir'
  },
  {
    id: 'filme-3',
    titulo: 'Homem-Aranha',
    genero: 'Ação',
    tipo: 'Filme',
    status: 'Quero assistir'
  }
];

export default function App() {

  // Guarda os filmes cadastrados
  const [filmes, setFilmes] = useState(() => {
    try {
      const dados = localStorage.getItem('cinelist-filmes-v2');

      if (dados === null) {
        return filmesIniciais;
      }

      const lista = JSON.parse(dados);

      return Array.isArray(lista) ? lista : filmesIniciais;
    } catch {
      return filmesIniciais;
    }
  });

  // Guarda o filtro selecionado
  const [filtro, setFiltro] = useState('Todos');

  // Salva os filmes no navegador
  useEffect(() => {
    localStorage.setItem(
      'cinelist-filmes-v2',
      JSON.stringify(filmes)
    );
  }, [filmes]);

  // Adiciona um filme
  function adicionarFilme(novoFilme) {
    setFilmes(anteriores => [
      novoFilme,
      ...anteriores
    ]);

    setFiltro('Todos');
  }

  // Alterna o status de apenas um filme
  function alterarStatus(id) {
    setFilmes(anteriores =>
      anteriores.map(filme => {
        if (filme.id === id) {
          return {
            ...filme,
            status:
              filme.status === 'Quero assistir'
                ? 'Já assisti'
                : 'Quero assistir'
          };
        }

        return filme;
      })
    );
  }

  // Exclui apenas o filme selecionado
  function excluirFilme(id) {
    setFilmes(anteriores =>
      anteriores.filter(filme => filme.id !== id)
    );
  }

  // Conta quantos filmes foram assistidos
  const assistidos = filmes.filter(
    filme => filme.status === 'Já assisti'
  ).length;

  // Filtra os filmes exibidos
  const filmesFiltrados = filmes.filter(filme =>
    filtro === 'Todos' || filme.status === filtro
  );

  return (
    <div className="app">

      <Header
        total={filmes.length}
        assistidos={assistidos}
      />

      <main className="container">

        <section className="hero">
          <span className="eyebrow">
            🍿 SEU UNIVERSO CINEMATOGRÁFICO
          </span>

          <h1>
            Suas histórias favoritas,
            <br />
            <span>em um só lugar.</span>
          </h1>

          <p>
            Organize seus filmes e séries,
            acompanhe o que já assistiu
            e descubra o que assistir depois.
          </p>
        </section>

        <div className="layout">

          <AddForm onAdd={adicionarFilme} />

          <section className="catalog">

            <h2>
              Meu catálogo ({filmes.length})
            </h2>

            <div className="filters">

              {[
                'Todos',
                'Quero assistir',
                'Já assisti'
              ].map(opcao => (
                <button
                  key={opcao}
                  type="button"
                  className={
                    filtro === opcao
                      ? 'filter active'
                      : 'filter'
                  }
                  onClick={() => setFiltro(opcao)}
                >
                  {opcao}
                </button>
              ))}

            </div>

            <ItemList
              filmes={filmesFiltrados}
              onAlterar={alterarStatus}
              onExcluir={excluirFilme}
            />

          </section>

        </div>

      </main>

      <footer>
        🎬 CineList © 2026 — Projeto React
      </footer>

    </div>
  );
}
