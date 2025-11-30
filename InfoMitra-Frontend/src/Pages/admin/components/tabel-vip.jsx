import { SharedBrosurTable } from "./SharedBrosurTable";

export function TableVip() {
    return (
        <SharedBrosurTable
            title="Manajemen Brosur VIP"
            badgeLabel="Brosur VIP"
            filterRule={(item) => 
                item.posisi_iklan === 'brosur_vip' || item.posisi_iklan === 'carousel_vip'
            }
        />
    );
}