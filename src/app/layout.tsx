import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Analytics from "./analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ⚙️ ID de TikTok desde env
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "";

export const metadata: Metadata = {
  title: "Zero Procrastinación",
  description: "El método para dejar de posponer tu vida.",
  metadataBase: new URL("https://www.zeroprocrastinacion.com"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Zero Procrastinación – Cero excusas. Cien por ciento acción.",
    description: "Guía y método práctico para dejar de procrastinar en 7 días.",
    url: "/",
    siteName: "Zero Procrastinación",
    images: [
      {
        url: "/images/logo-Z-transparente.png",
        width: 800,
        height: 800,
        alt: "Logo Zero Procrastinación",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Procrastinación – Cero excusas. Cien por ciento acción.",
    description: "Guía en 7 días para dejar de posponer lo importante.",
    images: ["/images/logo-Z-transparente.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Stub de TikTok para que ttq exista antes de que cargue el SDK */}
        {TIKTOK_PIXEL_ID && (
          <Script id="ttq-stub" strategy="beforeInteractive">
            {`
              (function (w, d, t) {
                if (w[t]) return;
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer = function (t, e) {
                  t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                  }
                };
                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
              })(window, document, 'ttq');
            `}
          </Script>
        )}
      </head>
      <body className={`${inter.variable} font-sans bg-brand-dark text-brand-white`}>
        {/* GA + Meta + TikTok (carga SDKs y eventos) */}
        <Analytics />
        {children}
      </body>
    </html>
  );
}
