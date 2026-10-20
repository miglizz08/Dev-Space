export default function TipoIcone({ tipo }) {
  let desenho;

  switch (tipo) {
    case "hackathon":
      desenho = <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />;
      break;
    case "palestra":
      desenho = (
        <>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </>
      );
      break;
    case "networking":
      desenho = (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 14.5a5 5 0 0 1 5 5.5" />
        </>
      );
      break;
    case "game-day":
      desenho = (
        <>
          <rect x="3" y="8" width="18" height="9" rx="4.5" />
          <path d="M8 10.5v4M6 12.5h4" />
          <circle cx="15.5" cy="11.5" r=".8" fill="currentColor" />
          <circle cx="17.5" cy="13.5" r=".8" fill="currentColor" />
        </>
      );
      break;
    case "workshop":
      desenho = <path d="M14.5 6.5a4 4 0 0 0-5 5L3 18l3 3 6.5-6.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />;
      break;
    case "demo-day":
      desenho = (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4M10 8.5v3l3-1.5z" />
        </>
      );
      break;
    case "mentoria":
      desenho = <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />;
      break;
    default:
      return null;
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {desenho}
    </svg>
  );
}
