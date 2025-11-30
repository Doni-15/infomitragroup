import { useEffect, useState } from "react";

export function TitlePages(title){
    useEffect(() => {
        document.title = `${title} InfoMitra - Pusat Promosi UMKM`;
    }, [title])
}