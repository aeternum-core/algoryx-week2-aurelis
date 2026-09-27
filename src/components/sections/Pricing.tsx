import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowUpRight, Clock } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import { pricingPlansData } from "../../data/content";

interface PricingProps {
  darkMode?: boolean;
}

export default function Pricing({ darkMode = true }: PricingProps) {
  const [billingMode, setBillingMode] = useState<"project" | "sprint">("project");

  return (
    <section id="pricing" className="relative px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel number="08" tag="ENGAGEMENT">
              SERVICES & PRICING
            </SectionLabel>

            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <SplitText delay={0.1} mode="words">
                CHOOSE THE LEVEL
              </SplitText>
              <br />
              <span className="opacity-40">
                <SplitText delay={0.25} mode="words">
                  THAT FITS YOUR VISION.
                </SplitText>
              </span>
            </h2>
          </div>

          {/* Billing Mode Switcher (Per Project / Sprint Retainer) */}
          <div className="inline-flex rounded-full border p-1 backdrop-blur-xl border-indigo-200/80 bg-white/90 shadow-sm dark:border-white/15 dark:bg-white/[0.04]">
            <button
              type="button"
              onClick={() => setBillingMode("project")}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                billingMode === "project"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              Fixed Project
            </button>
            <button
              type="button"
              onClick={() => setBillingMode("sprint")}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                billingMode === "sprint"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              Sprint Retainer
            </button>
          </div>
        </div>

        {/* Pricing Cards 3-Column Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {pricingPlansData.map((plan, index) => {
            const price = billingMode === "project" ? plan.priceProject : plan.priceSprint;

            return (
              <Reveal
                key={plan.id}
                direction="up"
                delay={index * 0.12}
                className="h-full"
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative flex h-full flex-col justify-between rounded-[2rem] sm:rounded-[2.5rem] border p-6 sm:p-8 md:p-10 transition-all duration-300 ${
                    plan.featured
                      ? darkMode
                        ? "border-indigo-500/50 bg-gradient-to-b from-[#141420] to-[#0c0c10] text-white shadow-[0_20px_50px_rgba(99,102,241,0.2)]"
                        : "border-indigo-300 bg-gradient-to-b from-indigo-50/90 via-purple-50/30 to-white text-zinc-900 shadow-[0_25px_60px_rgba(99,102,241,0.14)] ring-1 ring-indigo-500/15"
                      : darkMode
                      ? "border-white/10 bg-[#0f0f13]/60 hover:border-white/20 text-white"
                      : "border-indigo-100/90 bg-white/80 hover:border-indigo-200 hover:bg-white/95 text-zinc-900 shadow-sm backdrop-blur-xl ring-1 ring-black/[0.02]"
                  }`}
                >
                  {/* Featured Badge */}
                  {plan.featured && (
                    <div className="absolute -top-3.5 right-8 flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white shadow-lg">
                      <Sparkles size={11} />
                      <span>Signature Studio Tier</span>
                    </div>
                  )}

                  <div>
                    {/* Tier Name & Tagline */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        {plan.name}
                      </h3>
                      <span className="flex items-center gap-1 font-mono text-[11px] opacity-60">
                        <Clock size={12} /> {plan.turnaround}
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed opacity-65 font-light min-h-[36px]">
                      {plan.description}
                    </p>

                    {/* Price display */}
                    <div className="my-8 border-y border-current/10 py-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                          {price}
                        </span>
                        {price !== "Custom" && (
                          <span className="font-mono text-xs opacity-50">
                            {billingMode === "project" ? "/ scope" : "/ month"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Deliverables Checklist */}
                    <ul className="space-y-3 text-xs opacity-80">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            size={14}
                            className="mt-0.5 text-indigo-600 dark:text-indigo-400 shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-10 pt-4">
                    <a
                      href="#contact"
                      className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        plan.featured
                          ? "bg-indigo-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:bg-indigo-500"
                          : "border border-indigo-200/80 hover:bg-indigo-50/80 text-zinc-900 shadow-xs dark:border-current/20 dark:hover:bg-current/[0.06] dark:text-white"
                      }`}
                    >
                      Start a conversation
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}