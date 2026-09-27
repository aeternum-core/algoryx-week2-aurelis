import type {
  ServiceItem,
  ProjectItem,
  TimelineStep,
  TestimonialItem,
  PricingPlan,
  StatItem,
} from "../types";

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    id: "strategy",
    title: "Strategy",
    tagline: "Turn ideas into direction.",
    description:
      "We unpack complex digital landscapes, define user trajectories, and structure clear architectural roadmaps before writing a single line of code.",
    deliverables: [
      "Product Positioning & Roadmap",
      "Information Architecture",
      "User Journey Mapping",
      "Interactive Prototyping",
    ],
    iconName: "Lightbulb",
  },
  {
    number: "02",
    id: "experience",
    title: "Experience",
    tagline: "Design interfaces people remember.",
    description:
      "We design tactile, responsive visual systems where every transition feels physical and every micro-interaction has communicative purpose.",
    deliverables: [
      "Design Systems & Tokenization",
      "Spatial & Responsive UI/UX",
      "Motion Choreography",
      "Accessibility & Inclusive Design",
    ],
    iconName: "Palette",
  },
  {
    number: "03",
    id: "technology",
    title: "Technology",
    tagline: "Build systems that perform.",
    description:
      "Modern frontend engineering built on solid web standards, GPU-accelerated graphics pipelines, and resilient modular component hierarchies.",
    deliverables: [
      "Full-Stack Web Engineering",
      "Performance & SEO Optimization",
      "Interactive Canvas & WebGL",
      "API Integrations & Pipelines",
    ],
    iconName: "Code2",
  },
  {
    number: "04",
    id: "motion",
    title: "Motion",
    tagline: "Give digital experiences a sense of life.",
    description:
      "Motion is not decoration; it is visual grammar. We implement physics-grounded animations that clarify hierarchy and evoke emotional resonance.",
    deliverables: [
      "Scroll-Linked Choreography",
      "Physics & Spring Dynamics",
      "Interactive Micro-Interactions",
      "Hardware-Accelerated Transitions",
    ],
    iconName: "Rocket",
  },
];

export const statsData: StatItem[] = [
  {
    value: 120,
    suffix: "+",
    label: "Projects Delivered",
    subtext: "From stealth startups to established brands",
  },
  {
    value: 48,
    suffix: "",
    label: "Global Clients",
    subtext: "Collaborating across 6 continents",
  },
  {
    value: 15,
    suffix: "+",
    label: "Countries Reached",
    subtext: "Decentralized digital studio model",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    subtext: "Measured across retention & review cycles",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "northstar",
    title: "Northstar",
    client: "Northstar Intelligence",
    category: "Digital Product",
    year: "2026",
    tagline: "High-density telemetry interface for quantitative analytics.",
    description:
      "An enterprise-grade telemetry workspace engineered for real-time risk simulation. Features fluid vector graphs, dynamic data scrubbing, and low-latency canvas rendering.",
    gradient: "from-cyan-500/30 via-blue-600/20 to-indigo-900/40",
    accentColor: "#06b6d4",
    iconName: "BarChart3",
    type: "dashboard",
    tags: ["Product Design", "React", "Data Visualization", "WebGL"],
    metrics: [
      { label: "Render Latency", value: "<12ms" },
      { label: "Data Throughput", value: "250k pts/sec" },
      { label: "User Task Speed", value: "+38%" },
    ],
    deliverables: [
      "Custom Data Visualization Engine",
      "Component Design System",
      "High-Density Dashboard UI",
    ],
  },
  {
    id: "morrow",
    title: "Morrow",
    client: "Morrow Spatial Labs",
    category: "Brand Experience",
    year: "2026",
    tagline: "Kinetic brand identity for next-generation spatial computing.",
    description:
      "A multisensory digital identity translating acoustic resonance into geometric crystal forms. The web experience evolves based on user velocity and viewport depth.",
    gradient: "from-purple-500/30 via-pink-600/20 to-rose-950/40",
    accentColor: "#ec4899",
    iconName: "Sparkles",
    type: "brand",
    tags: ["Brand Identity", "Generative Motion", "Spatial Audio", "Creative Web"],
    metrics: [
      { label: "Avg. Session Depth", value: "4m 12s" },
      { label: "Interaction Rate", value: "84%" },
      { label: "Brand Recall", value: "92%" },
    ],
    deliverables: [
      "Generative Identity Guidelines",
      "3D Interactive Sculptures",
      "Editorial Launch Platform",
    ],
  },
  {
    id: "forma",
    title: "Forma",
    client: "Forma Architecture",
    category: "Web Experience",
    year: "2025",
    tagline: "Monolithic architectural archive with spatial navigation.",
    description:
      "An archival web ecosystem showcasing brutalist and sustainable architectural monographs. Built with multi-layer parallax grids and seamless state transitions.",
    gradient: "from-emerald-500/30 via-teal-600/20 to-cyan-950/40",
    accentColor: "#10b981",
    iconName: "Globe2",
    type: "web",
    tags: ["Editorial Architecture", "Smooth Motion", "Content Strategy"],
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Page Load", value: "0.42s" },
      { label: "Award Honors", value: "3 Nominations" },
    ],
    deliverables: [
      "Multi-Plane Parallax Architecture",
      "Editorial Typography System",
      "Fluid Layout Engine",
    ],
  },
];

export const timelineStepsData: TimelineStep[] = [
  {
    number: "01",
    title: "Discover",
    phase: "IMMERSION & ALIGNMENT",
    duration: "Week 1–2",
    description:
      "We dissect the fundamental problem space, uncover hidden user constraints, and crystallize the core aesthetic and functional thesis.",
    outputs: [
      "Creative Brief & Architecture",
      "User Persona Matrix",
      "Technical Feasibility Audit",
    ],
  },
  {
    number: "02",
    title: "Design",
    phase: "EXPLORATION & PROTOTYPING",
    duration: "Week 3–4",
    description:
      "Concepts transmute into interactive spatial models. We test typography scale, kinetic rhythm, and tactile UI responses in live prototypes.",
    outputs: [
      "Component Design System",
      "High-Fidelity Motion Prototypes",
      "Micro-Interaction Specifications",
    ],
  },
  {
    number: "03",
    title: "Build",
    phase: "ENGINEERING & POLISH",
    duration: "Week 5–7",
    description:
      "Design and code merge into a high-performance, accessible product. Every gesture, scroll trigger, and responsive breakpoint is meticulously calibrated.",
    outputs: [
      "Production React/TypeScript Codebase",
      "GPU-Optimized Canvas Systems",
      "WCAG 2.1 AA Compliance",
    ],
  },
  {
    number: "04",
    title: "Launch",
    phase: "ORCHESTRATION & EVOLUTION",
    duration: "Week 8+",
    description:
      "The experience is deployed globally with CDN caching and analytics instrumentation. We monitor real-world performance and refine user feedback loops.",
    outputs: [
      "Zero-Downtime Deployment",
      "Performance Benchmark Report",
      "Continuous Design Iterations",
    ],
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "AURELIS transformed a complex mathematical idea into something people immediately understood and felt compelled to explore.",
    name: "Maya Chen",
    role: "Product Director",
    company: "Northstar Intelligence",
    location: "San Francisco",
    metric: "3.4x conversion lift",
  },
  {
    id: "2",
    quote:
      "The symbiosis of design restraint and engineering precision made our brand launch feel like a defining industry moment.",
    name: "Arjun Mehta",
    role: "Founding Partner",
    company: "Morrow Spatial Labs",
    location: "London",
    metric: "84% interaction depth",
  },
  {
    id: "3",
    quote:
      "Rarely do you find a studio that understands the balance between avant-garde visual motion and ruthless, sub-second web performance.",
    name: "Sofia Laurent",
    role: "Executive Creative Director",
    company: "Forma Architecture",
    location: "Paris",
    metric: "100/100 Lighthouse",
  },
];

export const pricingPlansData: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For focused digital concepts & MVPs.",
    description:
      "Ideal for emerging founders and teams seeking a high-impact, focused digital experience with pristine typography and responsive precision.",
    priceProject: "$2,500",
    priceSprint: "$1,800/mo",
    turnaround: "2–3 Weeks",
    features: [
      "Strategic Architecture Session",
      "Custom Typography & Design System",
      "Responsive 4-Section Landing Experience",
      "Smooth Scroll & Scroll-Reveal Motion",
      "Validated Interactive Contact Pipeline",
      "Standard Web Performance & SEO Polish",
    ],
    notIncluded: [
      "Custom Generative WebGL/Canvas Engines",
      "Multi-Page Interactive Ecosystem",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "For ambitious experiences that command attention.",
    description:
      "Our signature engagement. A bespoke digital masterpiece combining custom generative particle canvas, fluid sculpture, and advanced kinetic typography.",
    priceProject: "$6,000",
    priceSprint: "$4,200/mo",
    turnaround: "4–6 Weeks",
    featured: true,
    features: [
      "Comprehensive Digital Strategy & Research",
      "Full Bespoke Visual Language & Identity",
      "Interactive 4-Layer Parallax Showcase",
      "Generative Particle & Crystal Canvas Systems",
      "Interactive Case Study Previews & Modals",
      "Sub-Second Performance & 100% WCAG AA",
      "Dark / Light Ambient Lighting Engine",
      "Priority Production & Launch Support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For expansive products & complex ecosystems.",
    description:
      "Deep collaborative partnership for established companies building next-generation digital products, multi-surface design systems, and custom tooling.",
    priceProject: "Custom",
    priceSprint: "Custom/mo",
    turnaround: "Tailored Scope",
    features: [
      "Dedicated Senior Design & Engineering Cell",
      "Enterprise Multi-Platform Design Systems",
      "Custom Real-time Telemetry & Data Visuals",
      "Bespoke Spatial 3D Shaders & WebGL Systems",
      "Global CDN Architecture & Analytics Setup",
      "Ongoing Retainer & Feature Evolution",
    ],
  },
];
