import { lazy, Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HomeServiceFlow from "../components/home/HomeServiceFlow";

const ServiceCategories = lazy(() => import("../components/home/ServiceCategories"));

export default function Services() {
    return (
        <div className="min-h-screen bg-brick-texture font-sans">
            <Navbar />
            <main>
                <Suspense fallback={<div className="py-20 text-center text-stone-400">Loading catalogue...</div>}>
                    <ServiceCategories />
                </Suspense>
                <HomeServiceFlow />
            </main>
            <Footer />
        </div>
    );
}
