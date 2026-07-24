
import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Navbar";

// Public Layout — every public page gets the same Navbar + Footer.
export default function PublicLayout({ children }) {

  return (
    <>
      <Navbar />
      
      <main className="w-10/12 mx-auto">
        {children}
      </main>

      <Footer />
    </>
  );
}
