import { Benefits } from "./Partials/Benifits";
import { Features } from "./Partials/Features";
import { Header } from "./Partials/Header";
import { Hero } from "./Partials/Hero";
import { Testimonials } from "./Partials/Testimonials";
import { Cta } from "./Partials/Cta";
import { Footer } from "./Partials/Footer";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <main className="relative w-full bg-black text-white">
            <Head title="Home page" />
            <Header />
            <Hero />
            <Features />
            <Benefits />
            <Testimonials />
            <Cta />
            <Footer />
        </main>
    );
}
