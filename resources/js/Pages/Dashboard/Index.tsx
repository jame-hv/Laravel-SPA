import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { UserIcon } from "lucide-react";
import { PageProps } from "@/types";
import { ActivitiesChart } from "./Partials/ActivitiesChart";
import { useLang } from "@/hooks/use-lang";

interface Stats {
    totalUsers: number;
    growthPercentage: number;
    monthlyData: Array<{
        month: string;
        users: number;
    }>;
}
export default function Dashboard({ stats }: PageProps<{ stats: Stats }>) {
    console.log(stats);
    const { t } = useLang("pages.dashboard");
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    {t(".pageTitle")}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-xs sm:rounded-lg">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t(".totalUsers")}
                                    </CardTitle>
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stats.totalUsers}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {t(".fromLastMonth")}{" "}
                                        {stats.growthPercentage >= 0 ? "+" : ""}
                                        {stats.growthPercentage}%
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* User Chart  */}

                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>{t(".userGrowth")}</CardTitle>
                                <CardDescription>
                                    {t(".userGrowthDescription")}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart data={stats.monthlyData}>
                                            <CartesianGrid
                                                strokeDasharray={"3 3"}
                                            />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <ActivitiesChart />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
