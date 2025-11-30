import { ScrollToTop, TitlePages, termsData } from "@/Components";

export function SyaratDanKetentuan() {
    TitlePages('Syarat Dan Ketentuan | ');
    ScrollToTop();

    return (
        <>
            <h1 className="mx-auto font-bold md:text-2xl text-xl w-4/5 md:w-full text-center mt-5 lg:mt-10">
                SYARAT DAN KETENTUAN LAYANAN
            </h1>
        
            <div className="mx-5 md:mx-10 text-justify pb-16">
                {termsData.map((bab) => (
                    <section key={bab.id} className="pt-5 md:pt-8">
                        <h1 className="md:text-xl font-bold"> {bab.title} </h1>
                        <p className="md:text-lg text-base ml-5 md:ml-6"> {bab.description} </p>

                        {bab.listItems && bab.listItems.length > 0 && (
                            <ul className="list-disc ml-5 md:ml-6 font-normal md:text-lg text-base mt-1 list-inside">
                                {bab.listItems.map((item, index) => (
                                <li key={index}>
                                    {typeof item === 'object' ? (
                                        <>
                                            <b>{item.bold}</b> {item.text}
                                        </>
                                    ) : ( item  )}
                                </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </>
    );
}