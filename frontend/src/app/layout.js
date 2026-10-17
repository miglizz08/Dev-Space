import "./globals.css";

export const metadata = {
  title: "Dev'Space — agenda de eventos para quem programa",
  description: "Hackathon, palestra, networking e playtest para a comunidade dev.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
