// Mock data simulating Enron email dataset processing
export const mockBRDs = [
  {
    id: "brd-001",
    name: "Project Alpha — CRM Migration",
    status: "complete" as const,
    accuracy: 92.3,
    latency: 2.1,
    requirements: 45,
    createdAt: "2026-02-18",
    updatedAt: "2026-02-19",
  },
  {
    id: "brd-002",
    name: "Sprint Q4 — Platform Upgrade",
    status: "complete" as const,
    accuracy: 89.1,
    latency: 2.8,
    requirements: 38,
    createdAt: "2026-02-15",
    updatedAt: "2026-02-16",
  },
  {
    id: "brd-003",
    name: "Migration Plan — Legacy Systems",
    status: "running" as const,
    accuracy: 0,
    latency: 0,
    requirements: 0,
    createdAt: "2026-02-21",
    updatedAt: "2026-02-21",
  },
  {
    id: "brd-004",
    name: "Enron Compliance Audit",
    status: "complete" as const,
    accuracy: 94.7,
    latency: 1.9,
    requirements: 52,
    createdAt: "2026-02-10",
    updatedAt: "2026-02-12",
  },
  {
    id: "brd-005",
    name: "Trading Platform Requirements",
    status: "complete" as const,
    accuracy: 91.5,
    latency: 2.4,
    requirements: 41,
    createdAt: "2026-02-08",
    updatedAt: "2026-02-09",
  },
];

export const mockPipelineSteps = [
  { id: 1, name: "Ingestion", status: "complete" as const },
  { id: 2, name: "Noise Filtering", status: "complete" as const },
  { id: 3, name: "Entity Extraction", status: "active" as const },
  { id: 4, name: "BRD Generation", status: "pending" as const },
  { id: 5, name: "Validation", status: "pending" as const },
];

export const mockUploadQueue = [
  { name: "enron_emails_q4.csv", size: "2.3MB", progress: 100, status: "complete" as const },
  { name: "meeting_transcripts.txt", size: "340KB", progress: 55, status: "uploading" as const },
  { name: "chat_logs_2024.json", size: "1.1MB", progress: 0, status: "queued" as const },
];

export const mockMetrics = {
  overall: { accuracy: 92.4, precision: 94.1, recall: 90.8, f1: 92.4 },
  noiseFiltering: { input: 500000, output: 100000, removed: 80 },
  accuracyOverTime: [
    { date: "Week 1", accuracy: 85 },
    { date: "Week 2", accuracy: 88 },
    { date: "Week 3", accuracy: 90 },
    { date: "Week 4", accuracy: 91.5 },
    { date: "Week 5", accuracy: 92.4 },
    { date: "Week 6", accuracy: 93.1 },
  ],
  latencyDistribution: [
    { range: "0-1s", count: 12 },
    { range: "1-2s", count: 35 },
    { range: "2-3s", count: 28 },
    { range: "3-4s", count: 8 },
    { range: "4-5s", count: 3 },
  ],
  perBrd: mockBRDs.filter(b => b.status === "complete"),
};

export const mockBRDDocument = {
  title: "Project Alpha — CRM Migration",
  sections: [
    {
      title: "1. Project Overview",
      content: `**Project Name:** Project Alpha — CRM Migration
**Objective:** Migrate legacy CRM system to cloud-based infrastructure to improve scalability, reduce operational costs by 40%, and enable real-time analytics.
**Scope:** Full migration of customer data (2.3M records), workflow automation, and third-party integrations.
**Timeline:** Q2 2026 — Q4 2026 (6 months)`,
    },
    {
      title: "2. Stakeholders",
      content: `| Name | Role | Source |
|------|------|--------|
| J. Smith | Project Manager | Email #4521 |
| A. Lee | Tech Lead | Meeting #12 |
| R. Johnson | VP Engineering | Email #8903 |
| M. Davis | Product Owner | Transcript #45 |
| K. Wilson | QA Lead | Chat Log #234 |`,
    },
    {
      title: "3. Functional Requirements",
      content: `**FR-001:** User authentication via SSO (OAuth 2.0 + SAML)
**FR-002:** Role-based access control with 5 permission levels
**FR-003:** Real-time data synchronization across all client touchpoints
**FR-004:** Automated lead scoring using ML pipeline
**FR-005:** Custom dashboard builder with drag-and-drop widgets
**FR-006:** Email integration with bi-directional sync
**FR-007:** API gateway for third-party integrations (Salesforce, HubSpot)`,
    },
    {
      title: "4. Non-Functional Requirements",
      content: `**NFR-001:** 99.9% uptime SLA
**NFR-002:** Response time < 200ms for 95th percentile
**NFR-003:** Support 10,000 concurrent users
**NFR-004:** GDPR and SOC 2 compliance
**NFR-005:** Automated backup every 6 hours with 30-day retention`,
    },
    {
      title: "5. Risks & Mitigations",
      content: `| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data loss during migration | High | Medium | Parallel run for 4 weeks |
| API rate limiting | Medium | High | Implement request queuing |
| Vendor lock-in | Medium | Low | Use abstraction layers |`,
    },
    {
      title: "6. Success Metrics",
      content: `- Customer satisfaction score increase by 15%
- System response time < 200ms
- Zero data loss during migration
- 40% reduction in operational costs
- 95% user adoption within 3 months`,
    },
  ],
};

export const mockEnronStats = {
  totalEmails: 517401,
  uniqueSenders: 150,
  dateRange: "1999-2002",
  avgEmailsPerDay: 473,
  topSenders: [
    { name: "jeff.dasovich@enron.com", count: 28234 },
    { name: "sara.shackleton@enron.com", count: 25351 },
    { name: "tana.jones@enron.com", count: 19812 },
    { name: "vince.kaminski@enron.com", count: 18904 },
    { name: "chris.germany@enron.com", count: 15432 },
  ],
};
