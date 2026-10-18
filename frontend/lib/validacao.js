import { tipos } from "./tipos";

// Valida os campos antes de enviar o formulário.
export function validarEvento(dados) {
  const erros = {
    titulo: "",
    data: "",
    horario: "",
    local: "",
    tipo: "",
  };

  const titulo = String(dados.titulo ?? "").trim();
  const data = String(dados.data ?? "").trim();
  const horario = String(dados.horario ?? "").trim();
  const local = String(dados.local ?? "").trim();
  const tipo = String(dados.tipo ?? "").trim();

  if (!titulo) erros.titulo = "Informe o título.";
  if (!data) erros.data = "Informe a data.";
  if (!horario) {
    erros.horario = "Informe o horário.";
  } else if (!/^\d{2}:\d{2}$/.test(horario)) {
    erros.horario = "Use o formato HH:MM.";
  }
  if (!local) erros.local = "Informe o local.";
  if (!tipos.some((item) => item.value === tipo)) {
    erros.tipo = "Selecione o tipo do evento.";
  }

  return erros;
}
