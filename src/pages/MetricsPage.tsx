import { motion } from "framer-motion";
import { mockMetrics } from "@/data/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function MetricCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="stat-card text-center">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">System Performance</h1>
        <p className="page-subtitle">Validation & accuracy metrics across all pipelines</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <MetricCard label="Accuracy" value={`${mockMetrics.overall.accuracy}%`} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <MetricCard label="Precision" value={`${mockMetrics.overall.precision}%`} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MetricCard label="Recall" value={`${mockMetrics.overall.recall}%`} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <MetricCard label="F1 Score" value={`${mockMetrics.overall.f1}%`} />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Accuracy Over Time */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockMetrics.accuracyOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Latency Distribution */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Latency Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockMetrics.latencyDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Noise Filtering */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Noise Filtering Stats</h3>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-muted-foreground">Input</p>
            <p className="text-lg font-bold text-foreground">{mockMetrics.noiseFiltering.input.toLocaleString()} emails</p>
          </div>
          <div className="flex-1">
            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${100 - mockMetrics.noiseFiltering.removed}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">{mockMetrics.noiseFiltering.removed}% noise removed</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Output</p>
            <p className="text-lg font-bold text-success">{mockMetrics.noiseFiltering.output.toLocaleString()} relevant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
