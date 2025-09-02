import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // change path if your logo file is elsewhere

// SVG social icons
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 4.96 3.62 9.07 8.36 9.93v-7.02H7.9v-2.9h2.33V9.73c0-2.3 1.37-3.57 3.48-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.69-1.47 1.4v1.68h2.51l-.4 2.9h-2.11V22c4.74-.86 8.36-4.97 8.36-9.93z"/>
    </svg>
  );
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.51 3.51 0 0 0 12 9.5zM17.8 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
    </svg>
  );
}
function IconYouTube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.8 15.5V8.5L15.7 12z"/>
    </svg>
  );
}
function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.5 24l1.7-6A10 10 0 1 1 12 22a9.9 9.9 0 0 1-4.8-1.2zM12 3.6A8.4 8.4 0 0 0 5.9 18l.3.2-1 3.4 3.5-.9.2.1A8.4 8.4 0 1 0 12 3.6zm4.8 10.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.6.1a6.9 6.9 0 0 1-2-1.2 7.7 7.7 0 0 1-1.4-1.7c-.2-.3 0-.4.1-.5l.3-.3a1.7 1.7 0 0 0 .2-.3 1.1 1.1 0 0 0 0-.4c0-.1-.6-1.6-.8-2.2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.3 2.3 0 0 0-.7 1.7 4 4 0 0 0 .8 2.1 9 9 0 0 0 3.5 3.4 11.4 11.4 0 0 0 3.3 1.3 2.8 2.8 0 0 0 1.3.1 2.1 2.1 0 0 0 1.4-1 1.8 1.8 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 relative text-white overflow-x-clip">
      {/* Animated wave divider */}
      <div className="absolute -top-6 left-0 w-[200%] h-6 overflow-hidden">
        <svg
          className="w-[200%] h-6 text-brand-600 motion-safe:animate-wave-pan"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C240,48 480,48 720,0 C960,-48 1200,-48 1440,0 L1440,48 L0,48 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="bg-brand-600 relative">
        {/* CTA banner */}
        <section className="container py-8 md:py-10 relative">
          <div className="rounded-2xl bg-black/15 backdrop-blur px-6 py-6 md:px-8 md:py-7 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold">Ready to start your transformation?</h3>
              <p className="text-white/80 text-sm mt-1">Simple, sustainable nutrition—personalized to your routine.</p>
            </div>
            <div className="flex gap-3">
              <NavLink
                to="/book-appointment"
                className="relative rounded-full px-6 py-3 text-white bg-gradient-to-r from-brand-500 to-brand-600 overflow-hidden"
              >
                <span className="relative z-10">Book Appointment</span>
                {/* shimmer */}
                <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] motion-safe:animate-shimmer" />
              </NavLink>
              <NavLink to="/contact" className="rounded-full border border-white/30 px-6 py-3 hover:bg-white/10">
                Contact Us
              </NavLink>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <section className="container py-8 md:py-12 relative">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <NavLink to="/" className="inline-flex items-center gap-3">
                <img src={logo} alt="Figure ‘n Fit" className="h-12 w-auto" />
              </NavLink>
              <p className="mt-3 text-white/85 max-w-md">
                Dietitians & lifestyle coaches delivering science-backed, personalized plans for fat loss, PCOS,
                diabetes, sports & more.
              </p>
              {/* Social icons */}
              <div className="mt-4 flex gap-3">
                <a href="https://www.facebook.com/FigureNFits/" target="_blank" rel="noreferrer" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 motion-safe:hover:animate-float">
                  <IconFacebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/figure_n_fit/" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 motion-safe:hover:animate-float">
                  <IconInstagram className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/@figurenfit1433" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 motion-safe:hover:animate-float">
                  <IconYouTube className="h-5 w-5" />
                </a>
                <a href="https://wa.me/9913348004" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 motion-safe:hover:animate-float">
                  <IconWhatsApp className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-white/90">
                <li><NavLink to="/about" className="hover:underline">About Us</NavLink></li>
                <li><NavLink to="/services" className="hover:underline">Programs</NavLink></li>
                <li><NavLink to="/testimonials" className="hover:underline">Testimonials</NavLink></li>
                <li><NavLink to="/blog" className="hover:underline">Blog</NavLink></li>
                <li><NavLink to="/contact" className="hover:underline">Contact</NavLink></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold">Programs</h4>
              <ul className="mt-3 space-y-2 text-white/90">
                <li><NavLink to="/services/go-fat" className="hover:underline">Go Fat</NavLink></li>
                <li><NavLink to="/services/fight-pcod" className="hover:underline">Fight PCOD</NavLink></li>
                <li><NavLink to="/services/gut-nourishment" className="hover:underline">Gut Nourishment</NavLink></li>
                <li><NavLink to="/services/sports-nutrition" className="hover:underline">Sports Nutrition</NavLink></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold">Contact</h4>
              <ul className="mt-3 space-y-1 text-white/90">
                <li>📍 Station Branch, Surat</li>
                <li>📞 99133 48004</li>
                <li>✉️ info@figurenfit.com</li>
              </ul>
              <h5 className="mt-4 font-semibold">Hours</h5>
              <ul className="mt-2 text-white/90 text-sm space-y-1">
                <li>Mon–Sat: 10:00 AM – 7:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-10 rounded-2xl bg-white/10 border border-white/15 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-semibold">Get weekly diet & fitness tips</h4>
                <p className="text-white/85 text-sm">No spam. Unsubscribe anytime.</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
                <input className="rounded-full px-4 py-3 text-black w-64" placeholder="Your email" />
                <button className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90">Subscribe</button>
              </form>
            </div>
          </div>
        </section>

        {/* Bottom bar */}
        <div className="border-t border-white/15">
          <div className="container py-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-white/80">
            <div>© {year} Figure ‘n Fit. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <NavLink to="/terms" className="hover:underline">Terms</NavLink>
              <NavLink to="/privacy" className="hover:underline">Privacy</NavLink>
              <NavLink to="/sitemap" className="hover:underline">Sitemap</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
