import { motion } from "framer-motion";
import { mockBRDs, mockEnronStats } from "@/data/mockData";
import { FileText, Activity, Target, Database, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const overviewStats = [
  { label: "Total BRDs", value: "24", icon: FileText, change: "+3" },
  { label: "Active Pipelines", value: "3", icon: Activity, change: "Live" },
  { label: "Avg Accuracy", value: "92.4%", icon: Target, change: "+1.2%" },
  { label: "Docs Processed", value: "150K", icon: Database, change: "+12K" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subtitle">Monitor your AI requirement intelligence pipeline</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent BRDs */}
        <div className="col-span-2 stat-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Recent BRDs</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/brds")} className="text-xs gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-3">
            {mockBRDs.slice(0, 5).map((brd) => (
              <div key={brd.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{brd.name}</p>
                    <p className="text-xs text-muted-foreground">{brd.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {brd.status === "complete" ? (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                      {brd.accuracy}%
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-0.5 rounded-full animate-pulse-dot">
                      Running
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/brds")}>
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-4">
          <div className="stat-card">
            <h2 className="text-sm font-semibold text-foreground mb-4">Active Pipeline</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Entity Extraction</span>
                  <span className="font-medium text-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Migration Plan</span>
                <span>~2 min remaining</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <h2 className="text-sm font-semibold text-foreground mb-3">Enron Dataset</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Emails</span>
                <span className="font-medium text-foreground">{mockEnronStats.totalEmails.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unique Senders</span>
                <span className="font-medium text-foreground">{mockEnronStats.uniqueSenders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date Range</span>
                <span className="font-medium text-foreground">{mockEnronStats.dateRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg/Day</span>
                <span className="font-medium text-foreground">{mockEnronStats.avgEmailsPerDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
