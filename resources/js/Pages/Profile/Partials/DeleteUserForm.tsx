import { useLang } from "@/hooks/use-lang";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const { t } = useLang("pages.profile.deleteUserForm");
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium">{t(".title")}</h2>

                <p className="mt-1 text-sm">{t(".description")}</p>
            </header>

            <Button variant="destructive" onClick={confirmUserDeletion}>
                {t(".button.deleteAccount")}
            </Button>

            <Dialog
                open={confirmingUserDeletion}
                onOpenChange={(open) => !open && closeModal()}
            >
                <DialogContent>
                    <form onSubmit={deleteUser} className="space-y-6">
                        <DialogHeader>
                            <h2 className="text-lg font-medium text-foreground">
                                {t(".title")}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {t(".description")}
                            </p>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="sr-only">
                                    {t("common.password")}
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full"
                                    autoFocus
                                    placeholder={t("common.password")}
                                    aria-invalid={
                                        errors.password ? "true" : "false"
                                    }
                                />

                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={closeModal}
                            >
                                {t("common.close")}
                            </Button>

                            <Button
                                variant="destructive"
                                type="submit"
                                disabled={processing}
                            >
                                {t(".button.deleteAccount")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
