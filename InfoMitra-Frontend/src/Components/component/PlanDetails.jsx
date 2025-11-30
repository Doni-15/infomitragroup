import { useState, useEffect } from 'react';

const formatCurrency = (amount) => {
    return amount.toLocaleString('id-ID');
};

export function PlanDetails ({ plan }) {
    const [quantity, setQuantity] = useState(1);
    const minBulan = 1;
    const maxBulan = 99;

    useEffect(() => {
        setQuantity(1);
    }, [plan]);

    const handleIncrease = () => {
        setQuantity((prevQty) => Math.min(prevQty + 1, maxBulan));
    };

    const handleDecrease = () => {
        setQuantity((prevQty) => Math.max(prevQty - 1, minBulan));
    };

    const totalPrice = plan.priceNumeric * quantity;
    const isMin = quantity <= minBulan;
    const isMax = quantity >= maxBulan;

    return (
        <section className="w-full lg:w-[800px] p-2 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-justify rounded-lg">
            <div>
                <h1 className="font-bold mb-3 md:text-xl text-lg flex justify-between">
                    <span>{plan.judul}</span>
                    <span>{plan.harga}</span>
                </h1>
                
                <section className="w-full md:w-[250px] flex text-2xl text-[#cccccc] select-none text-center h-[40px]">
                    <button onClick={handleDecrease} disabled={isMin}
                        className="w-1/3 border-2 border-black hover:bg-[#194274] font-bold rounded-l-lg bg-[#0A2A4E] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        -
                    </button>
                    <div className="w-1/3 border-y-2 font-bold border-black bg-[#0A2A4E] flex items-center justify-center text-lg">
                        {quantity}
                    </div>
                    <button onClick={handleIncrease} disabled={isMax}
                        className="w-1/3 border-2 hover:bg-[#194274] font-bold border-black rounded-r-lg bg-[#0A2A4E] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        +
                    </button>
                </section>

                <div className="flex items-center text-xl h-[40px] mt-3 px-3 rounded-lg border-[#0A2A4E] border-2">
                    <div className="text-base md:text-xl flex justify-between w-full">
                        <span className='text-left'>{quantity} bulan</span>
                        <span className='text-left'>Rp {formatCurrency(plan.priceNumeric)}</span>
                        <span className='text-right'>= Rp {formatCurrency(totalPrice)}</span>
                    </div>
                </div>
            </div>

            <h1 className="font-bold md:text-lg text-base mt-5">Keuntungan:</h1>
            <ul className="text-base md:text-lg list-disc ml-5">
                {plan.benefit.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </section>
    );
}