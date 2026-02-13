'use client'
import testimonials from "@/constants/testimonials";
import { useRef } from "react";
import { ArrowBigLeft, ArrowBigRight, Star } from 'lucide-react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GIFtext } from "../ui/GIFtext";

export const Testimonials: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);


    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="cases" className="py-24 bg-dark border-y border-slate-800 relative">
            <div className="bg-main/45 w-40 h-40 rounded-full absolute -right-12 blur-3xl scale-150 z-0" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Success Stories</h2>
                        <p className="mt-4 text-lg text-slate-400">Hear from the <GIFtext GifName="pop-cat.gif" height={60} width={60}>academic leaders</GIFtext> transforming their institutions.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="rounded-full border border-white/10 p-3 hover:bg-white/10 transition-colors text-white"
                        >
                            <span className="material-symbols-outlined"><ArrowBigLeft /></span>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="rounded-full border border-white/10 p-3 hover:bg-white/10 transition-colors text-white"
                        >
                            <span className="material-symbols-outlined"><ArrowBigRight /></span>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto hide-scrollbar gap-6 scrollbar-hide pb-4 snap-x snap-mandatory"
                >
                    {testimonials.map((t) => (
                        <div key={t.id} className="min-w-[350px] md:min-w-[400px] snap-center rounded-2xl glass-card p-8 flex flex-col justify-between transition-colors hover:bg-gray-900 z-10">
                            <div>
                                <div className="flex gap-1 text-amber-400 mb-6">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}><Star fill="yello" /></span>
                                    ))}
                                </div>
                                <blockquote className="text-xl font-medium text-white leading-relaxed">
                                    {t.quote}
                                </blockquote>
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <img alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10" src={t.avatar} />
                                <div>
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-sm text-slate-400">{t.role}, {t.institution}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
