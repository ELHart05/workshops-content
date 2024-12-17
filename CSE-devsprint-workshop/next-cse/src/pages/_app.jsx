import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
