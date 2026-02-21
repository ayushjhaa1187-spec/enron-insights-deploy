import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, MessageSquare, Database, Upload as UploadIcon, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockUploadQueue } from "@/data/mockData";

const sources = [
  {
    icon: Mail,
    title: "Email Upload",
    description: "Drop CSV/JSON or browse files",
    formats: "Enron CSV, Gmail export, Outlook .pst",
  },
  {
    icon: FileText,
    title: "Transcript Upload",
    description: "Drop TXT/JSON or browse files",
    formats: "AMI, Zoom, Teams transcripts",
  },
  {
    icon: MessageSquare,
    title: "Chat Upload",
    description: "Drop chat identifiers or logs",
    formats: "Slack export, Teams chat logs",
  },
  {
    icon: Database,
    title: "Use Demo Dataset",
    description: "Use the Enron + AMI demo dataset",
    formats: "500K emails, 279 transcripts",
  },
];

export default function UploadPage() {
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Upload Data Sources</h1>
        <p className="page-subtitle">Upload emails, transcripts, or chat logs to generate BRDs</p>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-4 gap-4">
        {sources.map((source, i) => (
          <motion.button
            key={source.title}
            className={`stat-card text-left transition-all ${
              selectedSource === i
                ? "ring-2 ring-primary border-primary"
                : "hover:border-primary/30"
            }`}
            onClick={() => setSelectedSource(i)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent mb-3">
              <source.icon className="h-5 w-5 text-accent-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">{source.title}</p>
            <p className="text-xs text-muted-foreground mb-2">{source.description}</p>
            <p className="text-[10px] text-muted-foreground/70">{source.formats}</p>
          </motion.button>
        ))}
      </div>

      {/* Drop Zone */}
      {selectedSource !== null && selectedSource < 3 && (
        <motion.div
          className="rounded-xl border-2 border-dashed border-primary/30 bg-accent/30 p-10 text-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <UploadIcon className="h-10 w-10 text-primary/40 mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            Drag & drop your files here
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            or click to browse files
          </p>
          <Button variant="outline" size="sm">
            Browse Files
          </Button>
        </motion.div>
      )}

      {/* Upload Queue */}
      <div className="stat-card">
        <h2 className="text-sm font-semibold text-foreground mb-4">Upload Queue</h2>
        <div className="space-y-3">
          {mockUploadQueue.map((file) => (
            <div key={file.name} className="flex items-center gap-4">
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{file.size}</span>
                </div>
                <Progress value={file.progress} className="h-1.5" />
              </div>
              <div className="flex-shrink-0">
                {file.status === "complete" ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : file.status === "uploading" ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Processing */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleStartProcessing}
          disabled={isProcessing}
          className="gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            <>Start Processing Pipeline</>
          )}
        </Button>
      </div>
    </div>
  );
}
