import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { Company } from "./Company";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { data } from "@/routes";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Company company={data.company} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: user.name,
                        email: user.email,
                        avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
