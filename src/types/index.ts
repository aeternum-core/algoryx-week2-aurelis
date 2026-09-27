export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  iconName: "Palette" | "Code2" | "Lightbulb" | "Rocket";
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  gradient: string;
  accentColor: string;
  iconName: "BarChart3" | "Sparkles" | "Globe2";
  type: "dashboard" | "brand" | "web";
  tags: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
}

export interface TimelineStep {
  number: string;
  title: string;
  phase: string;
  duration: string;
  description: string;
  outputs: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  metric: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceProject: string;
  priceSprint: string;
  turnaround: string;
  featured?: boolean;
  features: string[];
  notIncluded?: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}
