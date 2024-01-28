import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "./globals.css";
//import { Container, SSRProvider } from "react-bootstrap";
import { Container, SSRProvider } from "@/components/bootstrap";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextJS 14.1 Image Gallery",
    description: "Learning Nextjs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <SSRProvider>
                    <NavBar />
                    <main>
                        <Container className="py-4">{children}</Container>
                    </main>
                </SSRProvider> */}
                <NavBar />
                <main>
                    <Container className="py-4">{children}</Container>
                </main>
            </body>
        </html>
    );
}
