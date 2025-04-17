import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/hooks/use-lang";
import GuestLayout from "@/Layouts/GuestLayout";
import { cn } from "@/lib/utils";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    const { t } = useLang("pages.verifyEmail");

    return (
        <GuestLayout>
            <Head title={t(".pageTitle")} />

            <div className={cn("flex flex-col gap-6")}>
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 ">
                        <div className="p-6 md:p-8">
                            <div className="mb-4 text-sm ">
                                {t(".description")}
                            </div>

                            {status === "verification-link-sent" && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {t(".verificationLinkSent")}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mt-4 flex items-center justify-between">
                                    <Button type="submit" disabled={processing}>
                                        {t(".resendButton")}
                                    </Button>

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {t(".logout")}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
