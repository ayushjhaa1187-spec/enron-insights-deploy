
-- Create table for Enron email samples
CREATE TABLE public.enron_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id TEXT,
  sender TEXT NOT NULL,
  recipients TEXT,
  cc TEXT,
  subject TEXT,
  body TEXT,
  date TIMESTAMP WITH TIME ZONE,
  folder TEXT,
  relevance_score NUMERIC(3,2) DEFAULT 0.5,
  is_noise BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.enron_emails ENABLE ROW LEVEL SECURITY;

-- Public read access (this is public dataset)
CREATE POLICY "Enron emails are publicly readable"
  ON public.enron_emails FOR SELECT
  USING (true);

-- Create index for common queries
CREATE INDEX idx_enron_emails_sender ON public.enron_emails(sender);
CREATE INDEX idx_enron_emails_date ON public.enron_emails(date);
CREATE INDEX idx_enron_emails_relevance ON public.enron_emails(relevance_score);
