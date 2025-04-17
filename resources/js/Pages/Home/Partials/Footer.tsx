"use client";

import { Link } from "@inertiajs/react";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-12 bg-black border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            クラウド<span className="text-rose-500">SPA</span>
                        </h3>
                        <p className="text-white/70 mb-4">
                            強力なバックエンドと柔軟なフロントエンドの完璧な組み合わせ。
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">リソース</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    ドキュメント
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    チュートリアル
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    ブログ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    コミュニティ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">会社情報</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    私たちについて
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    採用情報
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    お問い合わせ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    パートナー
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">法的情報</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    クッキーポリシー
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white/50 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Cloud SPA. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
