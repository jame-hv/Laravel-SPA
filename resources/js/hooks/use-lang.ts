import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useLang(scope?: string) {
  const { t } = useTranslation();
  const translator = useCallback(
    (key: string) => {
      if (key.startsWith(".")) {
        return t(`${scope}${key}`);
      }

      return t(key);
    },
    [scope, t]
  );

  return { t: translator };
}
