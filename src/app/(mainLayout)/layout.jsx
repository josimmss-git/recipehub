import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
   
    <div className="bg-white dark:bg-gray-800 dark:text-white">
      <Navbar />
      
      <div>{children}</div>
      
          
        
        <Footer />
  </div>
  );
}
