"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const pathname = usePathname();
  const [novoAtivo, setNovoAtivo] = useState(false);

  useEffect(() => {
    const atualizarAtivo = () => setNovoAtivo(window.location.hash === "#novo-evento");
    atualizarAtivo();
    window.addEventListener("hashchange", atualizarAtivo);
    return () => window.removeEventListener("hashchange", atualizarAtivo);
  }, [pathname]);

  const eventosAtivo = pathname === "/eventos" && !novoAtivo;

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link className="brand" href="/" aria-label="Dev'Space, início">
          <svg className="brand-icon" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M4 6.5 14 2l10 4.5v15L14 26 4 21.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m10 10-4 4 4 4m8-8 4 4-4 4m-2-9-4 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
          <span>Dev<span className="brand-apostrophe">&apos;</span>Space</span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <Link className={eventosAtivo ? "nav-link is-active" : "nav-link"} href="/eventos">agenda</Link>
          <Link className={novoAtivo ? "nav-link is-active" : "nav-link"} href="/eventos#novo-evento">novo evento</Link>
        </nav>
      </div>
    </header>
  );
}
