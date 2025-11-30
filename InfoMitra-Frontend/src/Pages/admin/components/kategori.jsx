export function Kategori({ value, onChange }){
    return(
        <>
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="select select-bordered join-item font-medium bg-[var(--color-base-200)] px-3 rounded-md h-8"
            >
                <option value="">Semua Kategori</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Jasa">Jasa</option>
                <option value="Fashion">Fashion</option>
                <option value="Properti">Properti</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Lainnya">Lainnya</option>
            </select>
        </>
    );
}