import type { Metadata } from "next";
import { Bebas_Neue, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const display = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-display",
});

const body = Outfit({
    subsets: ["latin"],
    variable: "--font-body",
});

const script = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-script",
});

export const metadata: Metadata = {
    icons: { icon: "/favicon.svg" },
    title: "Bikers 4 Heroes | Illawarra charity rides, events & Convoy",
    description:
        "Bikers 4 Heroes is an Illawarra alliance of motorcycle mates who dress as Super Heroes to raise funds for kids and families in need. Follow events, past rides, and the i98FM Illawarra Convoy Lead Bike bid.",
    keywords: [
        "Bikers 4 Heroes",
        "Illawarra Convoy",
        "charity motorcycle",
        "i98FM",
        "Shellharbour",
        "Albion Park",
    ],
    openGraph: {
        title: "Bikers 4 Heroes",
        description: "Life's not always fair, so let's make it FUN.",
        url: "https://bikers4heroes.org",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-AU">
            <body className={`${display.variable} ${body.variable} ${script.variable} font-body antialiased`}>
                <Providers>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
