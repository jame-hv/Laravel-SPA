import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Edit({ user }: PageProps<{ user: User }>) {
    const { data, setData, errors, put, processing } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card className="p-4 sm:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label htmlFor="password">
                                    Password (leave blank to keep current)
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
