import { useEffect, useState } from "react";
import { getBranch, readSelectedBranchId, type Branch } from "@/lib/branch-store";

/** Reads the QR-selected branch after hydration (localStorage is client-only). */
export function useSelectedBranch(): Branch | undefined {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setId(readSelectedBranchId());
    sync();
    window.addEventListener("bookmyq:branch-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bookmyq:branch-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return getBranch(id);
}
