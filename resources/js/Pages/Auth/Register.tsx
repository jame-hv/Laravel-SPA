import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useLang } from "@/hooks/use-lang";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const { t } = useLang("pages.register");

    return (
        <GuestLayout>
            <Head title={t(".pageTitle")} />

            <div className={cn("flex flex-col gap-6")}>
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        {t(".pageTitle")}
                                    </h1>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username">
                                        {t(".inputLabel.userName")}
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder={t(".placeholder.name")}
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2 text-xs"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">
                                        {t(".inputLabel.email")}
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder={t(".placeholder.email")}
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2 text-xs"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            {t(".inputLabel.password")}
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2 text-xs"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="confirm-password">
                                            {t(".inputLabel.confirmPassword")}
                                        </Label>
                                    </div>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        autoComplete="current-password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2 text-xs"
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    {processing && <Loader />}
                                    {t(".uiText.signUp")}
                                </Button>

                                <div className="text-center text-xs">
                                    {t(".uiText.haveAccount")}{" "}
                                    <a
                                        href={route("login")}
                                        className="underline underline-offset-4 hover:text-blue-500"
                                    >
                                        {t(".uiText.loginLink")}
                                    </a>
                                </div>
                            </div>
                        </form>
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="https://ui.shadcn.com/placeholder.svg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    {t(".uiText.agreeToTerms")}{" "}
                    <a href="#">{t(".uiText.termsOfUse")}</a> {t(".uiText.and")}{" "}
                    <a href="#">{t(".uiText.privacyPolicy")}</a>
                    {t(".uiText.agreeToTermsEnd")}
                </div>
            </div>
        </GuestLayout>
    );
}
