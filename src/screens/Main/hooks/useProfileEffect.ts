import { http } from "@/services/http";
import { getProfile } from "@/services/users";
import { useEffect } from "react";

export function useProfileEffect() {
  useEffect(() => {
    const abortCtrl = new AbortController();

    async function fetch() {
      try {
        await getProfile(abortCtrl);
      } catch (err) {
        if (!http.isHttpAbort(err)) {
          console.error('FAILED TO GET PROFILE');
        }
      }
    }

    fetch();

    return () => {
      abortCtrl.abort();
    };
  }, []);
}
