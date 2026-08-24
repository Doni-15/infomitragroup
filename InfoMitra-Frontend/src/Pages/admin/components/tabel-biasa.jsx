import { SharedBrosurTable } from "./SharedBrosurTable";

const isRegularBrosur = (item) => item.posisi_iklan === 'grid';

export function TableBiasa() {
    return (
        <SharedBrosurTable
            title="Manajemen Brosur Biasa"
            badgeLabel="Grid Biasa"
            filterRule={isRegularBrosur}
        />
    );
}
