import { tipos } from "../../../lib/tipos";

export default function TipoBadge({ tipo }) {
  const tipoEvento = tipos.find((item) => item.value === tipo);
  const label = tipoEvento?.label.toLocaleLowerCase("pt-BR") ?? "evento";
  const className = tipoEvento ? `tipo-${tipoEvento.value}` : "";

  return <span className={`tipo-badge ${className}`}><span className="tipo-dot" aria-hidden="true" />{label}</span>;
}
