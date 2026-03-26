"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { SessionUser } from "@/lib/auth-session";
import { Shield, Zap, Lock, BarChart3, ChevronRight, Menu, Clock } from 'lucide-react';

const StarIcon = ({ className = "w-4 h-4", filled = true }: { className?: string; filled?: boolean }) => (
  <svg 
    className={`${className} ${filled ? 'text-yellow-500 fill-current' : 'text-neutral-300 dark:text-neutral-800'}`} 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

type MainPageProps = {
  user?: SessionUser | null;
};

const rates = [
  {
    rate: 4.9,
    title: "All in one platform",
    description: "We chose BloxBolt for efficient item management. The security and ease of use for end-user transactions is effective. We value its speed and excellent support.",
    name: "Michael Sutherland",
    date: "26/03/2026",
    profile: "https://cdn.prod.website-files.com/66f2e124a485e76ba634c932/689dc346fb47869c3c6b1ce0_6751d24a04a363cf4b98c3cd_img.svg",
  },
  {
    rate: 4.9,
    title: "From urgency to strategy",
    description: "BloxBolt allowed us to step away from reactive trading and finally manage inventory with strategy instead of urgency. The automated platform is a game changer.",
    name: "Tal Shachar",
    date: "26/03/2026",
    profile: "https://cdn.prod.website-files.com/66f2e124a485e76ba634c932/69035aed7b8b88051db93225_68790cf3e7efd0c4b0103d6b_tal_shahar.png",
  },
  {
    rate: 4.9,
    title: "From urgency to strategy",
    description: "BloxBolt allowed us to step away from reactive trading and finally manage inventory with strategy instead of urgency. The automated platform is a game changer.",
    name: "Tal Shachar",
    date: "26/03/2026",
    profile: "https://cdn.prod.website-files.com/66f2e124a485e76ba634c932/69035aed7b8b88051db93225_68790cf3e7efd0c4b0103d6b_tal_shahar.png",
  },
]

function FeatureCard({ icon, title, description, className = "" }: { icon: React.ReactNode; title: string; description: string; className?: string }) {
  return (
    <div className={`
      p-8 rounded-2xl bg-white border border-neutral-200 
      hover:bg-neutral-50 hover:border-violet-500/40 
      transition-all duration-500 group relative overflow-hidden ${className}
      dark:bg-white/[0.02] dark:border-white/10 dark:hover:bg-white/[0.04] dark:hover:border-violet-500/50
    `}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-all dark:bg-violet-500/5 dark:group-hover:bg-violet-500/10"></div>
      <div className="mb-6 inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-600 group-hover:scale-110 transition-transform duration-500 dark:text-violet-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 tracking-tight">{title}</h3>
      <p className="text-neutral-600 leading-relaxed font-light dark:text-zinc-400">{description}</p>
    </div>
  );
}

export default function MainPage({ user }: MainPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + rates.length) % rates.length);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-violet-500/30 font-sans antialiased dark:bg-[#050505] dark:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_0%_0%,#ede9fe,transparent_100%)] opacity-40 dark:bg-[radial-gradient(circle_farthest-side_at_0%_0%,#1a1033,transparent_100%)]"></div>
      </div>

      <SiteHeader />

      <main className="relative z-10 pt-0">
        <section className="container mx-auto px-6 pt-32 pb-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">4.9/5 Rating</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Meet the best <span className="text-violet-500">Roblox</span> <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-white/40">
              items marketplace
            </span>
          </h1>

          <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light dark:text-zinc-400">
            An unforgettable experience of Trading, Selling and Exchanging, not just Robux and Limiteds, but also In-Game Items!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/marketplace">
            <button className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              Visit the Market
            </button>
            </Link>
            <Link href="/login">
            <button className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-neutral-900/5 hover:bg-neutral-900/10 border border-neutral-900/10 rounded-lg font-semibold transition-all backdrop-blur-sm dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10">
              Learn More
            </button>
            </Link>
          </div>
        </section>

        {/* Architecture Spotlight: Bento Grid Features */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Escrow Protection"
              description="Funds are held securely until both parties confirm the trade. Zero scam risk."
              className="md:col-span-2"
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Instant Deposits"
              description="Fund your wallet with 10+ cryptocurrencies in seconds. No waiting, no hassle."
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6" />}
              title="24/7 Support"
              description="Our dedicated team is always here to help you, day and night."
            />
            <FeatureCard 
              icon={<Lock className="w-6 h-6" />}
              title="Hardening"
              description="Continuous configuration monitoring."
              className="md:col-span-2"
            />
          </div>
        </section>
        
        <section className="container mx-auto px-6 py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-50 border border-neutral-200 px-8 py-20 md:px-16 md:py-24 dark:bg-neutral-950 dark:border-white/10">
            {/* Vicarius-style Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#ddd6fe,transparent_70%)] opacity-40 dark:bg-[radial-gradient(circle_at_50%_100%,#2e1065,transparent_70%)] dark:opacity-50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent dark:via-violet-500/50"></div>
            
            <div className="relative z-10">

              {/* Testimonials Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                  Hear from our <span className="text-violet-500 dark:text-violet-400">Customers</span>
                </h2>
              </div>

              {/* Testimonials Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {[0, 1].map((offset) => {
                  const index = (currentIndex + offset) % rates.length;
                  const comment = rates[index];
                  return (
                    <div key={index} className={`flex flex-col bg-white border border-neutral-200 rounded-3xl p-8 transition-all duration-500 hover:border-violet-500/30 dark:bg-white/[0.03] dark:border-white/10 dark:hover:bg-white/[0.05] ${offset === 1 ? 'hidden md:flex' : 'flex'}`}>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < Math.floor(comment.rate)} />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white ml-1">{comment.rate}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{comment.title}</h3>
                      <p className="text-neutral-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
                      "{comment.description}"
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center overflow-hidden border border-violet-500/30">
                          <img src={comment.profile} alt="Michael" />
                        </div>
                        <div>
                          <div className="text-neutral-900 dark:text-white font-medium">{comment.name}</div>
                          <div className="text-xs text-neutral-500 dark:text-zinc-500">{comment.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Slider Navigation */}
              <div className="flex justify-center gap-4 mt-12">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
