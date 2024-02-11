import { useLayoutEffect } from "react";
import { http } from "@/services/http";
import { StorageKey } from "@/constants/storage";
import { renewToken } from "@/services/users";

export function useHttpRefreshTokenEffect() {
  useLayoutEffect(() => {
    const reset = http.handleTokenExpire(async () => {
      const accessToken = localStorage.getItem(StorageKey.Token);
      const refreshToken = localStorage.getItem(StorageKey.RefreshToken);

      if (!accessToken || !refreshToken) {
        return false;
      }

      try {
        const { accessToken: newAccessToken } = await renewToken();

        localStorage.setItem(StorageKey.Token, newAccessToken);

        console.log(newAccessToken);
        return true;
      } catch (err) {
        localStorage.removeItem(StorageKey.Token);
        localStorage.removeItem(StorageKey.RefreshToken);
      }

      return false;
    });

    return reset;
  }, []);
}
