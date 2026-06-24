import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: {
    default: "RecipeHub | Share & Discover Amazing Recipes",
    template: "%s | RecipeHub",
  },
  description:
    "RecipeHub is a modern recipe sharing platform where users can discover, create, save, and purchase delicious recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#080c16] text-[#f3f4f6]">
       
        <main className="flex-grow flex flex-col">{children}
          <Toaster
            position="top-right"
          reverseOrder={false}/>
        </main>
        
      </body>
    </html>
  );
}
