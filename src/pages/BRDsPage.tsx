import { mockBRDs } from "@/data/mockData";
import { FileText, Eye, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BRDsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">BRD Documents</h1>
          <p className="page-subtitle">All generated Business Requirements Documents</p>
        </div>
        <Button onClick={() => navigate("/upload")} className="gap-2">
          + New BRD
        </Button>
      </div>

      <div className="stat-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Name</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Accuracy</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Latency</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Reqs</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground">Updated</th>
              <th className="pb-3 text-xs font-semibold text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {mockBRDs.map((brd, i) => (
              <motion.tr
                key={brd.id}
                className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{brd.name}</span>
                  </div>
                </td>
                <td className="py-3">
                  {brd.status === "complete" ? (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">Complete</span>
                  ) : (
                    <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-0.5 rounded-full">Running</span>
                  )}
                </td>
                <td className="py-3 text-sm text-foreground">{brd.accuracy > 0 ? `${brd.accuracy}%` : "—"}</td>
                <td className="py-3 text-sm text-foreground">{brd.latency > 0 ? `${brd.latency}s` : "—"}</td>
                <td className="py-3 text-sm text-foreground">{brd.requirements || "—"}</td>
                <td className="py-3 text-xs text-muted-foreground">{brd.updatedAt}</td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => navigate("/live-brd")}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
