import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Card } from "@/components/ui/card";
import { useLang } from "@/hooks/use-lang";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useLang("pages.profile");
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    {t(".pageTitle")}
                </h2>
            }
        >
            <Head title={t(".pageTitle")} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card className=" p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card className="p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>

                    <Card className="p-4 shadow-sm sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
