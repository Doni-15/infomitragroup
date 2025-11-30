import { SearchIcon } from "@/assets/logo";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchingBrosur({ value, onChange }) {
    return(
        <>
            <div className="join shadow-sm flex gap-5 mb-1">
                <select  
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="select select-bordered join-item w-50 px-1 text-lg border-2 border-gray-400 focus:outline-none text-gray-700"
                >
                    <option value="">Semua Kategori</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Properti">Properti</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Lainnya">Lainnya</option>
                </select>

                <section className="flex items-center gap-2 font-medium border px-3 rounded-md h-8">
                    <MagnifyingGlassIcon className="size-6 text-gray-600" />
                    <input 
                        type="text" 
                        placeholder="Cari nama mitra..." 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="input input-bordered join-item p-1 text-base border-gray-400 focus:outline-none text-[var(--warna-utama)] w-full" 
                    />
                </section>
            </div>
        </>
    );
}