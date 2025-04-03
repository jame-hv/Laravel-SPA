import { PageProps } from "@/types";
import { Pagination } from "@/types/pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import UserTable from "./Partials/UserTable";
import { User } from "@/types/models";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateUserForm from "./Partials/CreateUserForm";

interface Props extends PageProps {
    users: Pagination<User>;
}

const Index = ({ auth, users, success }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight">Users</h2>
            }
        >
            <Head title="Users" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-end">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <div>
                                <DialogTrigger asChild>
                                    <Button>Create User</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Create New User
                                        </DialogTitle>
                                    </DialogHeader>
                                    <CreateUserForm setIsOpen={setIsOpen} />
                                </DialogContent>
                            </div>
                        </Dialog>
                    </div>
                    <UserTable users={users} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
