import { useState, useEffect } from "react";
import { hargaIklanService } from "@/services/hargaIklanService"; 
import { CheckIcon, CheckIcon2 } from "@/assets/logo"; 

export function PricingCard() {
  const [dataPaket, setDataPaket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await hargaIklanService.getAllPackages();
        
        const mappedData = (result || []).map((pkg) => {
          const labelUpper = (pkg.label || "").toUpperCase();
          const isVIP = pkg.name.toLowerCase().includes("vip");
          const isSpecialTheme = isVIP; 
          const durasiArr = [];
          const hargaArr = [];
          const diskonArr = [];

          if (pkg.discounts && pkg.discounts.length > 0) {
             pkg.discounts.forEach((disc) => {
                const labelDurasi = disc.duration === 12 ? "1 Tahun" : `${disc.duration} Bulan`;
                const totalHargaRaw = pkg.price * disc.duration;
                const stringHarga = `Rp ${totalHargaRaw.toLocaleString("id-ID")}`;
                const decimalDiskon = disc.percent / 100;

                durasiArr.push(labelDurasi);
                hargaArr.push(stringHarga);
                diskonArr.push(decimalDiskon);
             });
          } 
          else {
             durasiArr.push("1 Bulan");
             hargaArr.push(`Rp ${pkg.price.toLocaleString("id-ID")}`);
             diskonArr.push(0);
          }

          return {
            id: pkg.id,
            judul: pkg.name,
            background: isSpecialTheme ? "bg-[var(--color-base-100)] text-gray-300" : "bg-[#ececec] text-blue-950",
            path: isSpecialTheme ? CheckIcon2 : CheckIcon,
            populer: labelUpper === "POPULER", 
            benefit: pkg.features,
            durasi: durasiArr,
            harga: hargaArr,
            diskon: diskonArr
          };
        });

        setDataPaket(mappedData);
      } 
      catch (error) {
        console.error("Gagal ambil data paket:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Memuat Paket...</div>;
  }

  return (
    <section className="w-full mx-auto px-4 md:px-20 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
      {dataPaket.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </section>
  );
}


function Card({ item }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const parseRp = (str) => {
    if (!str) return 0;
    return Number(str.toString().replace("Rp", "").replace(/\./g, "").trim());
  };

  const formatRp = (num) => {
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  const handleChange = (e) => {
    const selectedIndex = parseInt(e.target.value);
    
    const hargaRaw = item.harga[selectedIndex];
    const hargaNum = parseRp(hargaRaw);
    const diskonVal = item.diskon[selectedIndex];
    const hargaDiskonNum = hargaNum * (1 - diskonVal);

    const newData = {
      durasi: item.durasi[selectedIndex],
      hargaAsli: hargaRaw,
      diskon: diskonVal,
      hargaFinal: diskonVal > 0 ? formatRp(hargaDiskonNum) : hargaRaw,
      coretAngka: diskonVal > 0,
    };

    setSelectedItems([newData]);
  };

  const defaultHargaRaw = item.harga[0];
  const defaultHargaNum = parseRp(defaultHargaRaw);
  const defaultDiskon = item.diskon[0];
  const defaultHargaDiskonNum = defaultHargaNum * (1 - defaultDiskon);

  const displayItem = selectedItems[0] || {
    durasi: item.durasi[0],
    hargaAsli: defaultHargaRaw,
    diskon: defaultDiskon,
    hargaFinal: defaultDiskon > 0 ? formatRp(defaultHargaDiskonNum) : defaultHargaRaw,
    coretAngka: defaultDiskon !== 0,
  };

  const handleOrder = () => {
    const phoneNumber = "6281264838533"; 

    const message = `
      Halo Admin InfoMitra, saya ingin memesan:
      *Paket:* ${item.judul}
      *Durasi:* ${displayItem.durasi}
      *Diskon:* ${displayItem.diskon}
      *Harga:* ${displayItem.hargaFinal}

      Mohon info cara pembayarannya. Terima kasih!
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");
  };

  return (
    <div className={`rounded-lg relative p-4 md:px-10 md:py-10 shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${item.background}`}>
      <section>
        <div className="font-bold flex flex-col items-center">
          <h1 className="text-xl text-center mb-2">{item.judul}</h1>
          {displayItem.coretAngka ? (
            <>
              <h1 className="text-lg font-bold text-center line-through text-gray-500 opacity-70">
                {displayItem.hargaAsli}
              </h1>
              <h1 className="text-3xl font-bold text-center">
                {displayItem.hargaFinal}
              </h1>
            </>
          ) : (
            <>
               <h1 className="text-3xl font-bold text-center">
                 {displayItem.hargaFinal}
               </h1>
            </>
          )}
          <h1 className="text-xl text-center mt-1">/ {displayItem.durasi}</h1>
        </div>

        {item.populer && (
          <div className="absolute top-0 right-0 font-bold h-8 px-8 bg-yellow-400 flex items-center text-blue-950 rounded-tr-lg rounded-bl-lg shadow-md">
            POPULER
          </div>
        )}
      </section>

      <section className="mt-5 text-lg min-h-[150px]">
        {item.benefit.map((benefit, index) => (
          <div key={index} className="flex mb-2 items-start justify-start">
            <img
              src={item.path} 
              alt="Check"
              width={"20px"}
              className="mr-3 mt-1"
              onError={(e) => e.target.style.display = 'none'}
            />
            <span>{benefit}</span>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <h1 className="font-semibold mb-2 text-sm uppercase">Pilih Durasi</h1>
        <select
          className="select w-full px-3 py-2 text-lg border-2 border-gray-300 rounded-md focus:outline-none bg-gray-50 cursor-pointer text-black"
          onChange={handleChange} 
          defaultValue={0}
        >
          {item.durasi.map((d, index) => (
            <option key={index} value={index}>
              {item.diskon[index] === 0 ? (
                <>{d} - {item.harga[index]}</>
              ) : (
                <>{d} - {item.harga[index]} (Hemat {item.diskon[index] * 100}%)</>
              )}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-5">
        {item.populer === true ?
          <>
           <button 
             onClick={handleOrder}
             className={`bg-yellow-400 font-bold w-full border text-blue-950 py-2 cursor-pointer rounded-lg hover:shadow-lg transition-all active:scale-95`}
           >
             Pilih {item.judul} Sekarang
           </button>
          </>
          :
          <>
           <button 
             onClick={handleOrder}
             className={`bg-[var(--color-success)] font-bold w-full border text-blue-950 py-2 cursor-pointer rounded-lg hover:shadow-lg transition-all active:scale-95`}
           >
             Pilih {item.judul} Sekarang
           </button>
          </>
        }
      </section>
    </div>
  );
}