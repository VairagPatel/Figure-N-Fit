import { NavLink } from "react-router-dom";

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 4.96 3.62 9.07 8.36 9.93v-7.02H7.9v-2.9h2.33V9.73c0-2.3 1.37-3.57 3.48-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.69-1.47 1.4v1.68h2.51l-.4 2.9h-2.11V22c4.74-.86 8.36-4.97 8.36-9.93z"/>
    </svg>
  );
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.51 3.51 0 0 0 12 9.5zM17.8 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
    </svg>
  );
}
function IconYouTube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.8 15.5V8.5L15.7 12z"/>
    </svg>
  );
}
function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M.5 24l1.7-6A10 10 0 1 1 12 22a9.9 9.9 0 0 1-4.8-1.2zM12 3.6A8.4 8.4 0 0 0 5.9 18l.3.2-1 3.4 3.5-.9.2.1A8.4 8.4 0 1 0 12 3.6zm4.8 10.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.6.1a6.9 6.9 0 0 1-2-1.2 7.7 7.7 0 0 1-1.4-1.7c-.2-.3 0-.4.1-.5l.3-.3a1.7 1.7 0 0 0 .2-.3 1.1 1.1 0 0 0 0-.4c0-.1-.6-1.6-.8-2.2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.3 2.3 0 0 0-.7 1.7 4 4 0 0 0 .8 2.1 9 9 0 0 0 3.5 3.4 11.4 11.4 0 0 0 3.3 1.3 2.8 2.8 0 0 0 1.3.1 2.1 2.1 0 0 0 1.4-1 1.8 1.8 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3z"/>
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="w-full bg-brand-700 text-white text-sm motion-reduce:animate-none animate-fade-in-down">
      <div className="container h-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="tel:+919913348004" className="hover:opacity-90">📞 99133 48004</a>
          <span className="hidden md:inline">|</span>
          <a href="mailto:info@figurenfit.com" className="hover:opacity-90">✉️ info@figurenfit.com</a>
        </div>

        <div className="flex items-center gap-2">
          {/* each icon gets a tiny float on hover */}
          <a href="https://www.facebook.com/FigureNFits/" target="_blank" rel="noreferrer"
             aria-label="Facebook"
             className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition motion-safe:hover:animate-float">
            <IconFacebook className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/figure_n_fit/" target="_blank" rel="noreferrer"
             aria-label="Instagram"
             className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition motion-safe:hover:animate-float">
            <IconInstagram className="h-4 w-4" />
          </a>
          <a href="https://www.youtube.com/@figurenfit1433" target="_blank" rel="noreferrer"
             aria-label="YouTube"
             className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition motion-safe:hover:animate-float">
            <IconYouTube className="h-4 w-4" />
          </a>
          <a href="https://wa.me/9913348004" target="_blank" rel="noreferrer"
             aria-label="WhatsApp"
             className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition motion-safe:hover:animate-float">
            <IconWhatsApp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

