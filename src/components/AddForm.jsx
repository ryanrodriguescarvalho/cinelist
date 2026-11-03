
import React, { useState } from 'react';

export default function AddForm({ onAdd }) {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [tipo, setTipo] = useState('Filme');
  const [status, setStatus] = useState('Quero assistir');

  function cadastrar(evento) {
    evento.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!titulo.trim() || !genero.trim()) {
      alert('Preencha o título e o gênero!');
      return;
    }

    // Cria um ID único para cada filme
    const id = typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Date.now().toString() + '-' +
          Math.random().toString(36).slice(2);

    // Cria o objeto do novo filme
    const novoFilme = {
      id: id,
      titulo: titulo.trim(),
      genero: genero.trim(),
      tipo: tipo,
      status: status
    };

    console.log('Filme cadastrado:', novoFilme);

    // Envia o filme para o App.jsx
    onAdd(novoFilme);

    // Limpa os campos depois do cadastro
    setTitulo('');
    setGenero('');
    setTipo('Filme');
    setStatus('Quero assistir');
  }

  return (
    <section className="form-card">
      <h2>➕ Adicionar título</h2>
      <p>Cadastre um filme ou série na sua lista.</p>

      <form onSubmit={cadastrar}>

        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          placeholder="Ex: Vingadores"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="genero">Gênero</label>
        <input
          id="genero"
          type="text"
          placeholder="Ex: Ação"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />

        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Filme">Filme</option>
          <option value="Série">Série</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Quero assistir">
            Quero assistir
          </option>
          <option value="Já assisti">
            Já assisti
          </option>
        </select>

        <button
          type="submit"
          className="btn-primary"
        >
          + Adicionar ao catálogo
        </button>

      </form>
    </section>
  );
}
