import { useEffect, useState } from "react";

import { getCatalogItems, getCachedCatalogItems } from "../api/catalogApi";
import type { CatalogItem } from "../types/catalog";

function useItemCatalog() {
    const [catalogItems, setCatalogItems] = useState<CatalogItem[]>( () => getCachedCatalogItems() ?? []);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
    const [catalogError, setCatalogError] = useState<string | null>(null);

    useEffect(() => {
        const cachedItems = getCachedCatalogItems();
        if(cachedItems){
            setCatalogItems(cachedItems);
            return;
        }

        let isMounted = true;

        const loadCatalogItems = async () => {
            try {
                setIsLoadingCatalog(true);
                setCatalogError(null);

                const data = await getCatalogItems();

                if (isMounted) {
                    setCatalogItems(data);
                }
            } catch {
                if (isMounted) {
                    setCatalogError("Không thể tải danh sách vật phẩm CS2");
                }
            } finally {
                if (isMounted) {
                    setIsLoadingCatalog(false);
                }
            }
        };

        loadCatalogItems();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        catalogItems,
        isLoadingCatalog,
        catalogError,
    };
}

export default useItemCatalog;