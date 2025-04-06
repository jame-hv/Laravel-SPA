import {
    Code,
    Zap,
    Database,
    RefreshCw,
    Shield,
    BrainCircuit,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Features() {
    const features = [
        {
            icon: <Code className="h-10 w-10 text-rose-500" />,
            title: "モダンな構文",
            description:
                "直感的な構文とコンポーネントベースのアーキテクチャで、クリーンで表現力豊かなコードを書けます。",
        },
        {
            icon: <Zap className="h-10 w-10 text-rose-500" />,
            title: "高速なパフォーマンス",
            description:
                "最適化されたレンダリングエンジンとバックエンドにより、高速なユーザー体験を提供します。",
        },
        {
            icon: <Database className="h-10 w-10 text-rose-500" />,
            title: "データ管理",
            description:
                "高度なデータベース操作と状態管理機能により、効率的なデータハンドリングを実現します。",
        },
        {
            icon: <BrainCircuit className="h-10 w-10 text-rose-500" />,
            title: "AI統合",
            description:
                "AI機能を簡単に統合できるAPIを提供し、アプリケーションのインテリジェンスを向上させます。",
        },
        {
            icon: <RefreshCw className="h-10 w-10 text-rose-500" />,
            title: "開発者体験",
            description:
                "高度な開発ツールと即時フィードバックにより、スムーズな開発体験を提供します。",
        },
        {
            icon: <Shield className="h-10 w-10 text-rose-500" />,
            title: "セキュリティ機能",
            description:
                "包括的なセキュリティ機能により、安全なアプリケーション開発を実現します。",
        },
    ];

    return (
        <section
            id="features"
            className="min-h-screen w-full flex items-center py-20 bg-gradient-to-b from-black to-gray-900"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        主な機能
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        私たちの技術は、シームレスな開発体験を提供するために設計されています。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-colors"
                        >
                            <CardHeader>
                                <div className="mb-2">{feature.icon}</div>
                                <CardTitle className="text-xl text-white">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70 text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
