"use client";

import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-white">
                        クラウド <span className="text-rose-500">SPA</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="#features"
                        className="text-white/80 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById("features");
                            if (element) {
                                window.scrollTo({
                                    top: element.offsetTop - 80, // Offset for header height
                                    behavior: "smooth",
                                });
                            }
                            setIsMenuOpen(false);
                        }}
                    >
                        機能
                    </Link>

                    <Link
                        href="#benefits"
                        className="text-white/80 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById("benefits");
                            if (element) {
                                window.scrollTo({
                                    top: element.offsetTop - 80,
                                    behavior: "smooth",
                                });
                            }
                            setIsMenuOpen(false);
                        }}
                    >
                        メリット
                    </Link>

                    <Link
                        href="#testimonials"
                        className="text-white/80 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            const element =
                                document.getElementById("testimonials");
                            if (element) {
                                window.scrollTo({
                                    top: element.offsetTop - 80,
                                    behavior: "smooth",
                                });
                            }
                            setIsMenuOpen(false);
                        }}
                    >
                        ユーザーの声
                    </Link>

                    <Button
                        onClick={() => router.get(route("login"))}
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                        ログイン
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <Link
                            href="#features"
                            className="text-white/80 hover:text-white transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                const element =
                                    document.getElementById("features");
                                if (element) {
                                    window.scrollTo({
                                        top: element.offsetTop - 80,
                                        behavior: "smooth",
                                    });
                                }
                                setIsMenuOpen(false);
                            }}
                        >
                            機能
                        </Link>

                        <Link
                            href="#benefits"
                            className="text-white/80 hover:text-white transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                const element =
                                    document.getElementById("benefits");
                                if (element) {
                                    window.scrollTo({
                                        top: element.offsetTop - 80,
                                        behavior: "smooth",
                                    });
                                }
                                setIsMenuOpen(false);
                            }}
                        >
                            メリット
                        </Link>

                        <Link
                            href="#testimonials"
                            className="text-white/80 hover:text-white transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                const element =
                                    document.getElementById("testimonials");
                                if (element) {
                                    window.scrollTo({
                                        top: element.offsetTop - 80,
                                        behavior: "smooth",
                                    });
                                }
                                setIsMenuOpen(false);
                            }}
                        >
                            ユーザーの声
                        </Link>
                        <div className="flex flex-col space-y-2 pt-2">
                            <Button
                                onClick={() => router.get(route("login"))}
                                className="bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
