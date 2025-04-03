import { User } from "@/types/models";
import { PaginatedData } from "@/types/pagination";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
    users: PaginatedData<User>;
}

export default function UserTable({ users }: Props) {
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    const handleDelete = (userId: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.destroy", userId));
        }
    };

    return (
        <Card className="overflow-x-auto">
            <div className="w-full">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="border-b">
                            <th className="h-8 px-4 text-left align-middle font-medium">
                                Name
                            </th>
                            <th className="h-8 px-4 text-left align-middle font-medium">
                                Email
                            </th>
                            <th className="h-8 px-4 text-left align-middle font-medium">
                                Created At
                            </th>
                            <th className="h-8 px-4 text-left align-middle font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b transition-colors hover:bg-muted/50"
                            >
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.created_at}</td>
                                <td className="p-4 flex gap-2">
                                    <Button
                                        onClick={() =>
                                            router.visit(
                                                route("users.edit", user.id)
                                            )
                                        }
                                        variant="secondary"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(user.id)}
                                        variant="destructive"
                                        size="sm"
                                        className="text-xs"
                                        disabled={deletingUserId === user.id}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-end p-4 gap-2">
                    {users.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || ""}
                            aria-disabled={!link.url}
                            aria-current={link.active}
                            className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md px-2 text-xs font-medium transition-colors ${
                                link.active
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                            } ${
                                !link.url
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
}
