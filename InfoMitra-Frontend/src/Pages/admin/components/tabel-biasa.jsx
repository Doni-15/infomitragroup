import { SharedBrosurTable } from "./SharedBrosurTable";

export function TableBiasa() {
    return (
        <SharedBrosurTable
            title="Manajemen Brosur Biasa"
            badgeLabel="Grid Biasa"
            filterRule={(item) => item.posisi_iklan === 'grid'}
        />
    );
}