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
    metadataBase: new URL("https://bikers4heroes.org"),
    icons: { icon: "/favicon.svg" },
    title: {
        default: "Bikers 4 Heroes | Super Heroes on two wheels",
        template: "%s | Bikers 4 Heroes",
    },
    description:
        "Life's not always fair, so let's make it FUN. Illawarra motorcycle mates in capes, raising funds for kids who fight the real battles. Events, rides, and the i98FM Illawarra Convoy Lead Bike bid.",
    keywords: [
        "Bikers 4 Heroes",
        "Illawarra Convoy",
        "charity motorcycle",
        "i98FM",
        "Shellharbour",
        "Albion Park",
        "Lead Bike",
    ],
    openGraph: {
        title: "Bikers 4 Heroes | Super Heroes on two wheels",
        description:
            "Life's not always fair, so let's make it FUN. Capes, bikes, and a Lead Bike bid for Illawarra kids.",
        url: "https://bikers4heroes.org",
        siteName: "Bikers 4 Heroes",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: "/og.jpg",
                width: 1200,
                height: 630,
                alt: "Bikers 4 Heroes — Super Heroes on two wheels. Illawarra charity motorcycle rides for kids.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Bikers 4 Heroes | Super Heroes on two wheels",
        description:
            "Life's not always fair, so let's make it FUN. Capes, bikes, and a Lead Bike bid for Illawarra kids.",
        images: ["/og.jpg"],
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
