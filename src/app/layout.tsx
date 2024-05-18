import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Toaster} from "sonner";
    import React from "next";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        default: "SuperToDo",
        template: `%s | SuperToDo`
    },
    description: "Super to do project(snatched)",
};


export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            {children}
            <Toaster
                theme="dark"
                position={"bottom-right"}
                duration={1500}
            />
        </Providers>
        </body>
        </html>
    );
}
