import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
const f = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] });
export const metadata: Metadata = { title: "Google Developer Groups, RBU", description: "Empowering students with cutting-edge tech skills, community and resources for a future in technology." };
const init = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: init }} /></head><body className={f.className}>{children}</body></html>);
}
