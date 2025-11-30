import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function Search({ value, onChange }) {
    return(
        <>
            <section className="flex items-center gap-2 font-medium bg-[var(--color-base-200)] px-3 rounded-md h-8">
                <MagnifyingGlassIcon className="size-6 text-gray-600" />
                <input 
                    type="text" 
                    placeholder="Cari nama mitra..." 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="input input-bordered join-item p-1 text-base border-gray-400 focus:outline-none bg-[var(--color-base-200)] text-[var(--color-text)] w-full" 
                />
            </section>
        </>
    );
}