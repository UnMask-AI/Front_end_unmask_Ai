import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";

const themeScript = `
(function() {
  var theme = localStorage.getItem('theme');
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.add(theme);
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UnMask AI — Audio Deepfake Detection",
  description:
    "Advanced AI-powered audio deepfake detection. Upload audio and instantly know if it's real or AI-generated. WhatsApp bot included.",
  keywords: [
    "deepfake detection",
    "audio deepfake",
    "AI detection",
    "voice verification",
    "audio forensics",
    "UnMask AI",
  ],
  openGraph: {
    title: "UnMask AI — Audio Deepfake Detection",
    description:
      "Detect AI-generated audio in seconds. Protect truth with industry-leading accuracy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
