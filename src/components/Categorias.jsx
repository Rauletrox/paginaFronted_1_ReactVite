import React from 'react';

function Categorias() {
  return (
    <>
      <section id="nintendo" className="container my-5" aria-labelledby="titulo-nintendo">
        <div className="p-4 bg-white border rounded">
          <h2 id="titulo-nintendo" className="h3">Categoria Nintendo</h2>
          <p className="text-secondary mb-0">Juegos, accesorios y packs pensados para jugadores de Nintendo Switch.</p>
        </div>
      </section>

      <section id="pc-gaming" className="container my-5" aria-labelledby="titulo-pc">
        <div className="p-4 bg-white border rounded">
          <h2 id="titulo-pc" className="h3">Categoria PC Gaming</h2>
          <p className="text-secondary mb-0">Componentes y articulos para mejorar tu computador gamer.</p>
        </div>
      </section>
    </>
  );
}

export default Categorias;
