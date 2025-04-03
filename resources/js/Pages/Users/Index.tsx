import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserTable from "./Partials/UserTable";
import CreateUserForm from "./Partials/CreateUserForm";
import { User } from "@/types/models";
import { PaginatedData } from "@/types/pagination";

interface Props extends PageProps {
    users: PaginatedData<User>;
}

export default function Index({ auth, users }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl leading-tight">Users</h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <CreateUserForm />
                    </div>

                    <div className="overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <UserTable users={users} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
