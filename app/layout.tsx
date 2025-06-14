import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Coffee Connoissseur",
  description: "Découvrez les cafés locaux près de chez vous.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className}`}>
        <Container maxWidth={{ md: "80vw" }}>
          <Theme accentColor="brown" panelBackground="solid" appearance="dark">
            <main className="p-5">{children}</main>
            {/* <ThemePanel /> */}
          </Theme>
        </Container>
      </body>
    </html>
  );
}
