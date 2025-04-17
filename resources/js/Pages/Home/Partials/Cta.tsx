"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function Cta() {
    return (
        <section className="w-full py-20 bg-rose-500">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        次のプロジェクトを始める準備はできましたか？
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        すでに数千人の開発者が私たちの技術で革新的なアプリケーションを構築しています。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Input
                            type="email"
                            placeholder="メールアドレスを入力"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 max-w-md"
                        />
                        <Button className="bg-white text-rose-500 hover:bg-white/90">
                            始める <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <p className="text-sm text-white/70">
                        クレジットカード不要。無料で始められます。
                    </p>
                </div>
            </div>
        </section>
    );
}
