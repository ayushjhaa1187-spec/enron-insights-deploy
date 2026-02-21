import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const [temperature, setTemperature] = useState([0.3]);
  const [noiseThreshold, setNoiseThreshold] = useState([0.2]);
  const [model, setModel] = useState("gpt-4");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeSources, setIncludeSources] = useState(true);
  const [autoValidate, setAutoValidate] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subtitle">Configure AI model, export preferences, and API keys</p>
      </div>

      {/* Model Settings */}
      <div className="stat-card space-y-5">
        <h2 className="text-sm font-semibold text-foreground">AI Model Settings</h2>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Temperature</Label>
            <span className="text-xs font-mono text-foreground">{temperature[0]}</span>
          </div>
          <Slider value={temperature} onValueChange={setTemperature} min={0} max={1} step={0.1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Noise Threshold</Label>
            <span className="text-xs font-mono text-foreground">{noiseThreshold[0]}</span>
          </div>
          <Slider value={noiseThreshold} onValueChange={setNoiseThreshold} min={0} max={1} step={0.05} />
        </div>
      </div>

      {/* Export Preferences */}
      <div className="stat-card space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Export Preferences</h2>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Default Format</Label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-foreground">Include Metadata</Label>
          <Switch checked={includeMetadata} onCheckedChange={setIncludeMetadata} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm text-foreground">Include Sources</Label>
          <Switch checked={includeSources} onCheckedChange={setIncludeSources} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm text-foreground">Auto-validate</Label>
          <Switch checked={autoValidate} onCheckedChange={setAutoValidate} />
        </div>
      </div>

      {/* API Keys */}
      <div className="stat-card space-y-4">
        <h2 className="text-sm font-semibold text-foreground">API Keys</h2>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">OpenAI API Key</Label>
          <div className="flex gap-2">
            <input
              type="password"
              value="sk-••••••••••••••••••••"
              readOnly
              className="flex-1 h-9 rounded-lg border bg-muted/50 px-3 text-sm font-mono"
            />
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => toast.success("Settings saved successfully!")}>Save Settings</Button>
        <Button variant="outline">Reset Defaults</Button>
      </div>
    </div>
  );
}
