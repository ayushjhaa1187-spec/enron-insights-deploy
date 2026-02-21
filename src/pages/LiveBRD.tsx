import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mockBRDDocument, mockPipelineSteps } from "@/data/mockData";
import { CheckCircle, Loader2, Clock, Download, Share2, Edit, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function PipelineStatus() {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Pipeline Status
      </h3>
      {mockPipelineSteps.map((step) => (
        <div key={step.id} className={`pipeline-step ${
          step.status === "complete" ? "pipeline-step-complete" :
          step.status === "active" ? "pipeline-step-active" :
          "pipeline-step-pending"
        }`}>
          {step.status === "complete" ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : step.status === "active" ? (
            <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin" />
          ) : (
            <Clock className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{step.name}</span>
        </div>
      ))}
    </div>
  );
}

function BRDSection({ section, index }: { section: typeof mockBRDDocument.sections[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const [displayedContent, setDisplayedContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (index > 3) {
      setDisplayedContent("");
      setIsStreaming(true);
      return;
    }
    let i = 0;
    setIsStreaming(true);
    const interval = setInterval(() => {
      if (i < section.content.length) {
        setDisplayedContent(section.content.slice(0, i + 3));
        i += 3;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 8);
    return () => clearInterval(interval);
  }, [section.content, index]);

  return (
    <div className="border-b border-border last:border-0 py-4">
      <button
        className="flex items-center gap-2 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
        {isStreaming && index <= 3 && (
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
        )}
      </button>
      {isOpen && (
        <motion.div
          className="mt-3 pl-6 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed font-mono text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {index <= 3 ? displayedContent : (
            <span className="text-muted-foreground italic">Pending...</span>
          )}
          {isStreaming && index <= 3 && (
            <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse-dot" />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function LiveBRD() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Live BRD Document</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              Streaming
            </span>
            <span className="text-xs text-muted-foreground">Latency: 2.1s</span>
            <span className="text-xs text-muted-foreground">Accuracy: 92.3%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Edit className="h-3.5 w-3.5" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Pipeline sidebar */}
        <div className="stat-card">
          <PipelineStatus />
        </div>

        {/* BRD Document */}
        <div className="col-span-3 stat-card">
          <h2 className="text-lg font-bold text-foreground mb-1">
            {mockBRDDocument.title}
          </h2>
          <p className="text-xs text-muted-foreground mb-4">Generated BRD Document</p>
          <div>
            {mockBRDDocument.sections.map((section, i) => (
              <BRDSection key={section.title} section={section} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
