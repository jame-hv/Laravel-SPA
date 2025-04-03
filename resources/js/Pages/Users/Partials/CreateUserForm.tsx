import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEventHandler } from "react";

export default function CreateUserForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium">Create New User</h2>
                <p className="mt-1 text-sm ">Add a new user to the system.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing}>
                        Create User
                    </Button>
                </div>
            </form>
        </section>
    );
}
