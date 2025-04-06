"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
    const testimonials = [
        {
            quote: "私たちの技術は、Webアプリケーションの構築方法を一変させました。バックエンドの強力さとフロントエンドの柔軟性の組み合わせは無敵です。",
            author: "佐藤 美咲",
            role: "CTO, テックビジョン株式会社",
            avatar: "/placeholder.svg?height=100&width=100",
        },
        {
            quote: "この技術スタックに移行してから、開発速度が40%向上しました。開発者体験は素晴らしく、クライアントもパフォーマンスに満足しています。",
            author: "田中 健一",
            role: "リードデベロッパー, ウェブソリューションズ",
            avatar: "/placeholder.svg?height=100&width=100",
        },
        {
            quote: "多くの開発環境を経験してきましたが、この技術スタックは開発者の生産性とアプリケーションのパフォーマンスの最高のバランスを提供します。",
            author: "山田 えりか",
            role: "フリーランス開発者",
            avatar: "/placeholder.svg?height=100&width=100",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <section
            id="testimonials"
            className="min-h-screen w-full flex items-center py-20 bg-gradient-to-b from-black to-gray-900"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        ユーザーの声
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        私たちの技術で素晴らしいアプリケーションを構築している開発者たちの声をお聞きください。
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardContent className="pt-10 pb-6">
                            <Quote className="h-12 w-12 text-rose-500 mb-6 mx-auto" />
                            <p className="text-xl md:text-2xl text-center text-white mb-6">
                                {testimonials[currentIndex].quote}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center pb-10">
                            <Avatar className="h-16 w-16 mb-4">
                                <AvatarImage
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].author}
                                />
                                <AvatarFallback>
                                    {testimonials[currentIndex].author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h4 className="text-lg font-bold text-white/60">
                                    {testimonials[currentIndex].author}
                                </h4>
                                <p className="text-white/70">
                                    {testimonials[currentIndex].role}
                                </p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-gray-700 hover:bg-gray-700"
                                    onClick={prevTestimonial}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-gray-700 hover:bg-gray-700"
                                    onClick={nextTestimonial}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}
