import React from 'react';
import { ScrollToTop, TitlePages, privacyData } from "@/Components";

export function KebijakanPrivasi() {
    TitlePages('Kebijakan Privasi |');
    ScrollToTop();

    return (
        <>
            <h1 className="mx-auto font-bold md:text-2xl text-xl w-4/5 md:w-full text-center mt-5 lg:mt-10">
                KEBIJAKAN PRIVASI INFOMITRA
            </h1>
            <div className="mx-5 md:mx-10 text-justify pb-16">
                {privacyData.map((bab) => (
                    <section key={bab.id} className="pt-5 md:pt-8">
                        <h1 className="md:text-xl font-bold">
                            {bab.title}
                        </h1>

                        <p className="md:text-lg text-base ml-5 md:ml-6">
                            {Array.isArray(bab.description) ? (
                                bab.description.map((p, i) => (
                                    <React.Fragment key={i}>
                                        {p} {i < bab.description.length - 1 && <br />}
                                    </React.Fragment>
                                ))
                            ) : ( bab.description )}
                        </p>

                        {bab.listItems && bab.listItems.length > 0 && (
                            <ul className="list-disc ml-5 md:ml-6 font-normal md:text-lg text-base mt-2 list-inside">
                                {bab.listItems.map((item, index) => (
                                    <li key={index}>
                                        {typeof item === 'object' ? (
                                            <>
                                                <strong>{item.bold}</strong> {item.text}
                                            </>
                                        ) : ( item )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {bab.subSections && bab.subSections.map((sub) => (
                        <section key={sub.id} className={sub.className}>
                            <h1 className={sub.titleClassName}> {sub.title} </h1>
                            {sub.description && (
                                <p className={sub.pClassName}>
                                    {sub.description}
                                </p>
                            )}
                            <ul className={sub.ulClassName}>
                                {sub.listItems.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.bold}</strong> {item.text}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        ))}
                        
                        {bab.closingDescription && (
                            <p className="md:text-lg text-base ml-5 mt-2 md:ml-6">
                                {bab.closingDescription}
                            </p>
                        )}
                    </section>
                ))}
            </div>
        </>
    );
}