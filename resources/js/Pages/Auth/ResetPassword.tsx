import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/hooks/use-lang";
import GuestLayout from "@/Layouts/GuestLayout";
import { cn } from "@/lib/utils";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    const { t } = useLang("pages.resetPassword");

    return (
        <GuestLayout>
            <Head title={t(".pageTitle")} />

            <div className={cn("flex flex-col gap-6")}>
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 ">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="email">
                                        {t(".inputLabel.email")}{" "}
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className=" flex flex-col gap-3">
                                    <Label htmlFor="password">
                                        {t(".inputLabel.password")}{" "}
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder={t(".placeholder.password")}
                                        autoFocus
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="password_confirmation">
                                        {t(".inputLabel.confirmPassword")}
                                    </Label>

                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        placeholder={t(
                                            ".placeholder.confirmPassword"
                                        )}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end">
                                    <Button disabled={processing}>
                                        {t(".pageTitle")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    {t("pages.login.uiText.agreeToTerms")}{" "}
                    <a href="#">{t("pages.login.uiText.termsOfUse")}</a>{" "}
                    {t("pages.login.uiText.and")}{" "}
                    <a href="#">{t("pages.login.uiText.privacyPolicy")}</a>
                    {t("pages.login.uiText.agreeToTermsEnd")}
                </div>
            </div>
        </GuestLayout>
    );
}
