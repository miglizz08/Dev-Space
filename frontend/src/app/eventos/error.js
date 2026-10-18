"use client";

export default function EventosError({ error, reset }) {
  void error;

  return (
    <main className="page-shell events-page eventos-error">
      <p className="error-state" role="alert">Algo deu errado ao carregar a página.</p>
      <button className="button" type="button" onClick={reset}>Tentar novamente</button>
    </main>
  );
}
