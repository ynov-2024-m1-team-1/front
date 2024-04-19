"use client";
import Header from "@/components/partials/Header";
import HeaderBackoffice from "@/components/partials/HeaderBackOffice";
import Footer from "@/components/partials/Footer";
import { usePathname } from "next/navigation";
import { DM_Serif_Display, Work_Sans } from "next/font/google";

const dm_serif_display = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"],
});
const work_sans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "700", "600", "900"],
});

export default function RootLayout({ children }) {
    const pathname = usePathname();

    return (
        <html lang="en">
            {pathname.includes("/backoffice") ? (
                <body
                    className={`${dm_serif_display.className} ${work_sans.className} flex`}
                >
                    <HeaderBackoffice className="w-1/4" />
                    <main className="w-3/4">{children}</main>
                </body>
            ) : (
                <body
                    className={`${dm_serif_display.className} ${work_sans.className}`}
                >
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </body>
            )}
        </html>
    );
}
