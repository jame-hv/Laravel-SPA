import ApplicationLogo from "@/Components/ApplicationLogo";
import { ThemeProvider } from "@/components/theme-provider";

import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
            </div>
        </ThemeProvider>
    );
}
