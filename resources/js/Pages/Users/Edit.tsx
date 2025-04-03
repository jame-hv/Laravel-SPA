import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

const Edit = ({ user }: PageProps<{ user: User }>) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("users.update", user.id), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px:6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="password">
                                Password (leave blank to use current password)
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoComplete="new-password"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                required={data.password !== ""}
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                className={`btn ${processing ? "loading" : ""}`}
                            >
                                {processing ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Edit;
