import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

import { 
    faqData, ScrollToTop, TitlePages, CaraKerja, HeroSection, NilaiNilai
} from "@/Components";


export function Beranda() {
    TitlePages('Beranda | ');
    ScrollToTop();

    return (
        <>
            <HeroSection beranda={true}/>
            <NilaiNilai />
            <CaraKerja pages={false}/>

            <section className="px-5 md:px-8 text-left pb-16 lg:px-20 pt-10 bg-[#ececec]">
                <h1 className="text-center font-bold text-2xl md:text-3xl px-5 md:px-30 pb-5">
                    FAQ InfoMitra
                </h1>
                
                {faqData.map((faq) => (
                    <details key={faq.id} className='mb-2 group shadow-[0_2px_5px_rgba(0,0,0,0.5)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.5)]'>
                        <summary className="my-1 text-lg lg:text-xl font-medium cursor-pointer list-none shadow-[0_2px_10px_rgba(0,0,0,0.5)] px-5 py-2 flex justify-between items-center">
                            {faq.question}
                            <span className="transition-transform duration-300 group-open:rotate-180">
                                <IoIosArrowDown />
                            </span>
                        </summary>

                        <div className="overflow-hidden max-h-0 group-open:max-h-96 transition-all duration-500 ease-in-out">
                            <p className="ml-9 lg:ml-10 mb-5 text-justify text-lg lg:text-xl pr-5">
                                {typeof faq.answer === 'object' ? (
                                    <>
                                    {faq.answer.part1}
                                    <Link to={faq.answer.linkTo} className="text-blue-800 underline">
                                        {faq.answer.linkText}
                                    </Link>
                                    {faq.answer.part2}
                                    </>
                                ) : ( faq.answer )}
                            </p>
                        </div>
                    </details>
                ))}
            </section>
        </>
    );
}