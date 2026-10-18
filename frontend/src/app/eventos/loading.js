export default function LoadingEventos() {
  return (
    <main className="page-shell events-page">
      <h1 className="page-heading-title">Eventos</h1>
      <p className="status-state" role="status">Carregando eventos...</p>
      <ul className="ag-lista skeleton-lista" aria-hidden="true">
        {[1, 2, 3].map((linha) => (
          <li className="ag-linha" key={linha}>
            <div className="ag-data">
              <span className="skeleton skeleton-dia" />
              <span className="skeleton skeleton-mes" />
            </div>
            <div className="ag-corpo">
              <span className="skeleton skeleton-titulo" />
              <span className="skeleton skeleton-desc" />
              <span className="skeleton skeleton-meta" />
            </div>
            <div className="ag-lado">
              <span className="skeleton skeleton-tipo" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
