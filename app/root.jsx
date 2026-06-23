import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "../src/index.css";

export const links = () => [
  { rel: "icon", type: "image/png", href: "/logo.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
  },
];

export const meta = () => [
  { title: "MBC Lab — Multimedia, Big Data & Cyber Security · Telkom University" },
  {
    name: "description",
    content:
      "MBC Lab is a student research laboratory at Telkom University, Bandung — five divisions, fifty-one assistants, turning coursework into real systems.",
  },
];

// Prevents a flash of the wrong theme before React hydrates.
const themeScript = `try{if(localStorage.getItem('mbc-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
