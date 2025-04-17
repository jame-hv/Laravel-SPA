"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { HeroModel } from "./HeroModel";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { router } from "@inertiajs/react";

export function Hero() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 z-0">
                <Canvas shadows camera={{ fov: 45, position: [0, 0, 10] }}>
                    <Suspense fallback={null}>
                        <HeroModel />
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Suspense>
                    <EffectComposer>
                        <Bloom mipmapBlur intensity={0.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="container mx-auto px-4 z-10 mt-20">
                <div className="max-w-3xl mx-auto text-center bg:white/100 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                        <span className="text-rose-500">クラウド</span>SPA
                        <br />
                        モダンなアプリケーションを構築
                    </h1>
                    <p className="text-xl text-white/70 mb-8">
                        私たちの技術を活用して、高速でインタラクティブなWebアプリケーションを作成しましょう。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => router.get(route("register"))}
                            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
                        >
                            今すぐ無料で始める
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
