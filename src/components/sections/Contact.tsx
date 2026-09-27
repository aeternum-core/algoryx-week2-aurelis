import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, RefreshCw, Send } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  service: "",
  budget: "$5k - $10k",
  message: "",
};

interface ContactProps {
  darkMode?: boolean;
}

export default function Contact({ darkMode = true }: ContactProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please provide a valid email format.";
    }

    if (!form.service) {
      nextErrors.service = "Please select an intended service discipline.";
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = "Please share a brief project summary (at least 10 characters).";
    }

    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 700);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all duration-200 backdrop-blur-md ${
      hasError
        ? "border-red-500 bg-red-500/[0.05] focus:border-red-500"
        : darkMode
        ? "border-white/10 bg-white/[0.03] text-white focus:border-indigo-500 focus:bg-white/[0.06]"
        : "border-indigo-100 bg-indigo-50/30 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white shadow-2xs"
    }`;

  return (
    <section id="contact" className="relative px-6 py-28 lg:px-12 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left Column: Studio Contact Editorial */}
        <Reveal direction="left" delay={0.1}>
          <SectionLabel number="09" tag="INQUIRY">
            GET IN TOUCH
          </SectionLabel>

          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText delay={0.15} mode="words">
              HAVE AN IDEA?
            </SplitText>
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <SplitText delay={0.3} mode="words">
                LET'S CREATE.
              </SplitText>
            </span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed opacity-70 sm:text-lg font-light">
            We partner with ambitious teams to create memorable digital
            experiences. Submit your brief to initiate an architectural session.
          </p>

          <div className="mt-12 space-y-6 border-t border-current/10 pt-8 font-mono text-xs">
            <div>
              <p className="opacity-50 uppercase tracking-wider">STUDIO LEAD & INQUIRIES</p>
              <p className="mt-1 font-semibold text-indigo-600 dark:text-indigo-400">
                Likith V Gowda — likith@aurelis.studio
              </p>
              <p className="mt-0.5 opacity-60">
                Bangalore, India (HQ)
              </p>
            </div>

            <div>
              <p className="opacity-50 uppercase tracking-wider">AVAILABILITY</p>
              <p className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Q2 / Q3 Design & Engineering Sprints Open</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Validated Contact Form */}
        <Reveal direction="right" delay={0.2}>
          <div
            className={`rounded-[2.5rem] border p-8 sm:p-10 shadow-2xl backdrop-blur-2xl ${
              darkMode
                ? "border-white/10 bg-[#0e0e12]/80 text-white"
                : "border-indigo-100/90 bg-white/90 text-zinc-900 shadow-[0_25px_60px_rgba(99,102,241,0.1)] ring-1 ring-black/[0.03]"
            }`}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">
                  Inquiry Validated Successfully
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-65 font-light">
                  All fields have passed client-side schema validation. This is a
                  frontend internship demonstration; no server payload was dispatched.
                </p>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-current/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-current/[0.06]"
                  >
                    <RefreshCw size={14} />
                    Reset Demonstration Form
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-mono uppercase tracking-wider opacity-75"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Maya Chen"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClasses(Boolean(errors.name))}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-mono"
                    >
                      <AlertCircle size={13} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-mono uppercase tracking-wider opacity-75"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="maya@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClasses(Boolean(errors.email))}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-mono"
                    >
                      <AlertCircle size={13} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Service Selection Field */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="mb-2 block text-xs font-mono uppercase tracking-wider opacity-75"
                  >
                    Interested Discipline *
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`${inputClasses(
                      Boolean(errors.service)
                    )} ${darkMode ? "dark:bg-[#121218]" : "bg-zinc-50 text-zinc-900"}`}
                  >
                    <option value="">Select a discipline</option>
                    <option value="Strategy">Strategy & Product Positioning</option>
                    <option value="Experience">Experience & Design System</option>
                    <option value="Technology">Creative Engineering & WebGL</option>
                    <option value="Motion">Motion Choreography & Spatial</option>
                  </select>
                  {errors.service && (
                    <p
                      id="service-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-mono"
                    >
                      <AlertCircle size={13} /> {errors.service}
                    </p>
                  )}
                </div>

                {/* Project Message Field */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-mono uppercase tracking-wider opacity-75"
                    >
                      Project Summary *
                    </label>
                    <span className="font-mono text-[10px] opacity-50">
                      {form.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Describe your product vision, timeline, and goals..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClasses(
                      Boolean(errors.message)
                    )} resize-y`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-mono"
                    >
                      <AlertCircle size={13} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <>
                      <span>Validate & Submit Inquiry</span>
                      <Send
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}