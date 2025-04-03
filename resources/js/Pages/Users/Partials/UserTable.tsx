import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/helper";
import type { User } from "@/types/models";
import type { Pagination } from "@/types/pagination";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

interface Props {
    users: Pagination<User>;
}

const UserTable = ({ users }: Props) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (userId: number) => {
        setDeletingId(userId);
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.destroy", { user: userId }));
        }
    };

    const ActionButtons = ({ user }: { user: User }) => (
        <div className="flex space-x-2">
            <Button
                variant="link"
                className="text-blue-500 hover:text-blue-700 p-0 h-auto"
                onClick={() => {
                    router.get(route("users.edit", { user: user.id }));
                }}
            >
                Edit
            </Button>
            <Button
                variant="link"
                disabled={deletingId === user.id}
                className="text-red-500 hover:text-red-700 p-0 h-auto"
                onClick={() => {
                    handleDelete(user.id);
                }}
            >
                Delete
            </Button>
        </div>
    );

    return (
        <Card>
            {/* Desktop and tablet view */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="h-8 px-4 text-left align-middle">
                                Name
                            </th>
                            <th className="h-8 px-4 text-left align-middle">
                                Email
                            </th>
                            <th className="h-8 px-4 text-left align-middle">
                                Created At
                            </th>
                            <th className="h-8 px-4 text-left align-middle">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user: User) => (
                            <tr
                                key={user.id}
                                className="border-b transition-colors hover:bg-muted/50"
                            >
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    {formatDateTime(user.created_at)}
                                </td>
                                <td className="p-4">
                                    <ActionButtons user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile view - card layout */}
            <div className="md:hidden px-2">
                {users.data.map((user: User) => (
                    <Card key={user.id} className="mb-4 border-b">
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-1">
                                    <span className="font-medium text-muted-foreground">
                                        Name:
                                    </span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    <span className="font-medium text-muted-foreground">
                                        Email:
                                    </span>
                                    <span className="break-all">
                                        {user.email}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    <span className="font-medium text-muted-foreground">
                                        Created:
                                    </span>
                                    <span>{user.created_at}</span>
                                </div>
                                <div className="pt-2">
                                    <ActionButtons user={user} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination - responsive for all screen sizes */}
            <div className="flex flex-wrap items-center justify-end p-4 gap-2">
                {users.links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.url || "#"}
                        className={`px-3 py-1.5 text-sm rounded ${
                            link.active ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </div>
        </Card>
    );
};

export default UserTable;
