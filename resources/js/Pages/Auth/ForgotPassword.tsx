import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { InputError } from "@/components/errors/input-error";
import { useLang } from "@/hooks/use-lang";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    const { t } = useLang("pages.forgotPassword");

    return (
        <GuestLayout>
            <Head title={t(".pageTitle")} />

            <div className="mb-4 text-sm ">{t(".description")}</div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className={cn("flex flex-col gap-6")}>
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 ">
                        <form onSubmit={submit} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">
                                        {t(".emailLabel")}
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoFocus
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className=" flex items-center justify-end">
                                    <Button
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        {t(".resetButton")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    {t(".terms.agreement")}{" "}
                    <a href="#">{t(".terms.termsOfService")}</a>{" "}
                    {t(".terms.and")}{" "}
                    <a href="#">{t(".terms.privacyPolicy")}</a>
                    {t(".terms.agreementEnd")}
                </div>
            </div>
        </GuestLayout>
    );
}
