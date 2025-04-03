import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
    setIsOpen: (isOpen: boolean) => void;
}

const CreateUserForm = ({ setIsOpen }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="flex flex-col gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                {errors.name && (
                    <div className="text-sm text-red-500">{errors.name}</div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                />
                {errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    required
                />
                {errors.password && (
                    <div className="text-sm text-red-500">
                        {errors.password}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    required
                />
            </div>

            <Button type="submit" disabled={processing}>
                Create User
            </Button>
        </form>
    );
};

export default CreateUserForm;
