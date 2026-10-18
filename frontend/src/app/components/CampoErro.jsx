export default function CampoErro({ id, mensagem }) {
  if (!mensagem) return null;

  return <p className="campo-erro" id={id}>{mensagem}</p>;
}
