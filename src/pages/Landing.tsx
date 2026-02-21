import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Mail, FileText, Target, Clock, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Mail, value: "500K+", label: "Emails Processed" },
  { icon: FileText, value: "279", label: "Transcripts" },
  { icon: Target, value: "92%", label: "Accuracy" },
  { icon: Clock, value: "<3s", label: "Latency" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">BRD Agent</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Login
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-accent/60 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Zap className="h-3.5 w-3.5" />
              Powered by AI Multi-Agent Pipeline
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-foreground mb-4">
              Transform Scattered Communications Into{" "}
              <span className="text-primary">Structured Requirements</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              BRD Agent processes 500K+ Enron emails and meeting transcripts using AI to automatically generate Business Requirements Documents with 92%+ accuracy.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card text-center">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
              <Github className="h-4 w-4" /> View Demo
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-4 px-8 text-center text-xs text-muted-foreground">
        Team Wesolve_foru | HackFest 2.0 | GDG Cloud New Delhi — Enron Email Dataset (Kaggle)
      </footer>
    </div>
  );
}
