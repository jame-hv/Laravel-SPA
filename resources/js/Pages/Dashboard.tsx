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

interface Stats {
    totalUsers: number;
    growthPercentage: number;
    monthlyData: Array<{
        month: string;
        users: number;
    }>;
}

export default function Dashboard({ stats }: PageProps<{ stats: Stats }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalUsers}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats.growthPercentage >= 0 ? "+" : ""}
                            {stats.growthPercentage}% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Number of users over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
