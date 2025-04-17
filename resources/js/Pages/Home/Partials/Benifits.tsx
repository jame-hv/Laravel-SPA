"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BenefitsModel } from "./BenifitsModel";

export function Benefits() {
    const benefits = [
        {
            title: "迅速な開発",
            description:
                "直感的なツールと再利用可能なコンポーネントで、より短時間で機能豊富なアプリケーションを構築できます。",
        },
        {
            title: "シームレスな統合",
            description:
                "フロントエンドとバックエンドが完璧に連携し、スムーズな開発体験を提供します。",
        },
        {
            title: "スケーラブルなアーキテクチャ",
            description:
                "トラフィックの増加や複雑な要件に対応できる、ビジネスの成長に合わせて拡張可能なアプリケーションを設計できます。",
        },
    ];

    return (
        <section
            id="benefits"
            className="min-h-screen w-full flex items-center py-20 bg-gradient-to-b from-gray-900 to-black"
        >
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        なぜ私たちの技術を選ぶのか？
                    </h2>

                    <div className="space-y-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-rose-500 pl-6"
                            >
                                <h3 className="text-2xl font-bold mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-white/70">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2 h-[400px] relative">
                    <Canvas>
                        <Suspense fallback={null}>
                            <BenefitsModel />
                            <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
