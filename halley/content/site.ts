/* ------------------------------------------------------------------
   All site content lives here. Edit text, links, metrics or projects
   in this one file; every page reads from it.
------------------------------------------------------------------- */

export const site = {
  name: 'Halley Patel',
  url: 'https://halleypatel.vercel.app',
  role: 'AI Product Manager',
  identity: ['AI Product Manager', 'Technical Product Management', 'AI Product Strategy & Evaluation'],
  headline: { lead: 'I turn complex problems into products that make', accent: 'better decisions.' },
  statement:
    'I work at the intersection of product strategy, AI systems and business outcomes, translating ambiguous problems into structured requirements, reliable workflows and measurable product decisions.',
  email: 'halley1837patel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hp29',
  github: 'https://github.com/halley2904',
  /* Put the PDF in /public and set the path, for example '/halley-patel-resume.pdf'. Empty shows 'Request résumé'. */
  resume: '/Halley_Patel_Resume.pdf' as string,
  photo: '/halley.jpg',
  /* Fill these when ready; empty ones are hidden automatically. */
  x: 'https://x.com/halleyyy29',
  whatsapp: '' as string, // e.g. 'https://wa.me/91XXXXXXXXXX'
};

/* Internal link helper. Normal builds keep clean URLs; a preview build
   (NEXT_PUBLIC_PREVIEW=1) writes relative file links so it works offline. */
export const to = (path: string, from = '/') => {
  if (process.env.NEXT_PUBLIC_PREVIEW !== '1') return path;
  const [p, hash] = path.split('#');
  const depth = from.split('/').filter(Boolean).length;
  const up = '../'.repeat(depth);
  const clean = (p || '/').replace(/^\//, '').replace(/\/$/, '');
  const file = clean ? `${clean}/index.html` : 'index.html';
  if (!clean && hash !== undefined && depth === 0) return `#${hash}`;
  return up + file + (hash !== undefined ? `#${hash}` : '');
};

/* Path to a file in /public that also works in the offline preview build. */
export const asset = (file: string, from = '/') =>
  process.env.NEXT_PUBLIC_PREVIEW === '1' ? '../'.repeat(from.split('/').filter(Boolean).length) + file.replace(/^\//, '') : file;

export const resumeLink = (from = '/') =>
  site.resume
    ? { href: asset(site.resume, from), label: 'View résumé', download: false, ext: true }
    : { href: `mailto:${site.email}?subject=R%C3%A9sum%C3%A9%20request`, label: 'Request résumé', download: false, ext: false };

export type Metric = { value: number; suffix: string; label: string; source: string; href?: string };

export const metrics: Metric[] = [
  { value: 15000, suffix: '+', label: 'records analyzed', source: 'Payer AI & Clinical Risk', href: '/work/payer-ai-clinical-risk/' },
  { value: 7500, suffix: '+', label: 'images evaluated', source: 'Vision-language model evaluation', href: '/#evaluation' },
  { value: 712, suffix: '', label: 'expert-reviewed ground-truth cases', source: 'LLM evaluation & benchmarking', href: '/#evaluation' },
];

export type Category = 'Production' | 'Product build' | 'Strategy';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'decisions'; items: { decision: string; tradeoff: string }[] }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'diagram' }
  | { type: 'links' }
  | { type: 'callout'; text: string };

export type Section = { id: string; title: string; blocks: Block[] };

export type Project = {
  slug: string;
  no: string;
  title: string;
  category: Category;
  kind: string;
  outcome: string;
  summary: string;
  tags: string[];
  role: string;
  links: { label: string; href: string }[];
  disclosure?: string;
  diagram: { title: string; steps: { label: string; note: string }[]; outputs?: string[] };
  sections: Section[];
};

const S = (id: string, title: string, blocks: Block[]): Section => ({ id, title, blocks });

export const projects: Project[] = [
  {
    slug: 'payer-ai-clinical-risk',
    no: '01',
    title: 'Payer AI & Clinical Risk',
    category: 'Production',
    kind: 'Professional production experience',
    outcome:
      'Surfaced a 53% high-risk miss rate across 15,000+ records, then redesigned the evaluation framework and cut false positives by 52%.',
    summary:
      'Defining and evaluating AI decision-support workflows for payer and clinical risk, from domain guidelines to measurable quality.',
    tags: ['AI decision support', 'Evaluation design', 'Risk governance', 'Requirements'],
    role: 'Product definition, evaluation design and stakeholder collaboration',
    links: [],
    diagram: {
      title: 'From guidelines to a governed risk decision',
      steps: [
        { label: 'Domain guidelines', note: 'Clinical and payer rules' },
        { label: 'Product requirements', note: 'Structured, testable criteria' },
        { label: 'AI risk workflow', note: 'Decision support, not autopilot' },
        { label: 'Evaluation framework', note: 'Misses and false positives' },
      ],
      outputs: ['Low risk', 'Needs review', 'High risk'],
    },
    sections: [
      S('overview', 'Overview', [
        { type: 'p', text: 'AI decision-support workflows for payer and clinical risk, where a wrong call has a real cost: a missed high-risk case, or a reviewer buried in false alarms. My work sat between the domain experts, the engineering team and the people who rely on the output.' },
        { type: 'stats', items: [
          { value: '15,000+', label: 'records analyzed' },
          { value: '53%', label: 'high-risk miss rate identified' },
          { value: '52%', label: 'fewer false positives after redesign' },
        ] },
      ]),
      S('problem', 'User & business problem', [
        { type: 'p', text: 'Risk models were being judged on headline performance, while the cases that mattered most, the high-risk ones, were not measured on their own. That hid two problems at once: high-risk cases slipping through, and too many low-value alerts competing for reviewer attention.' },
      ]),
      S('opportunity', 'Product opportunity', [
        { type: 'p', text: 'Turn evaluation from a one-time model report into a product capability: clear criteria for what "good" means for each risk tier, so the team could see failure early and make deployment decisions with evidence.' },
      ]),
      S('role', 'My role & ownership', [
        { type: 'list', items: [
          'Defined product requirements for AI decision-support workflows',
          'Translated domain guidelines into structured, testable requirements',
          'Designed evaluation criteria and success metrics with engineering',
          'Worked with stakeholders on readmission risk governance',
        ] },
      ]),
      S('discovery', 'Discovery & requirements', [
        { type: 'p', text: 'The starting point was the guidelines domain experts already use. Each rule was rewritten as a requirement the system could be tested against, with explicit handling for cases the guidelines did not cover.' },
        { type: 'list', items: [
          'Which cases must never be missed, and how a miss is detected',
          'What a reviewer needs to see to trust or override an output',
          'Which errors are tolerable, and at what volume',
        ] },
      ]),
      S('decisions', 'Key decisions & trade-offs', [
        { type: 'decisions', items: [
          { decision: 'Measure high-risk performance separately from overall accuracy', tradeoff: 'A less flattering headline number, in exchange for seeing the failures that matter.' },
          { decision: 'Keep the AI in a decision-support role', tradeoff: 'Slower than full automation, but consequential calls stay with accountable people.' },
          { decision: 'Treat false positives as a product cost, not a safety margin', tradeoff: 'Required tighter criteria, but protected reviewer attention.' },
        ] },
      ]),
      S('workflow', 'Workflow & architecture', [{ type: 'diagram' }]),
      S('visuals', 'Visual demonstrations', [
        { type: 'callout', text: 'This is production work, so internal screens and data are not shown. The workflow above reflects the structure of the work without exposing confidential details.' },
      ]),
      S('evaluation', 'Evaluation & success metrics', [
        { type: 'list', items: [
          'High-risk miss rate, tracked as its own metric',
          'False-positive volume reaching reviewers',
          'Agreement with domain guidelines on reviewed cases',
        ] },
      ]),
      S('outcomes', 'Outcomes & evidence', [
        { type: 'p', text: 'Analysis across 15,000+ records surfaced a 53% high-risk miss rate that the earlier evaluation did not show. Following the redesigned evaluation framework, false positives dropped by 52%.' },
      ]),
      S('lessons', 'Limitations & lessons', [
        { type: 'p', text: 'A model can look strong on average and still fail the people it was built for. The lesson was to decide what failure means before measuring success, and to make that definition part of the product.' },
      ]),
      S('next', 'What I would build next', [
        { type: 'list', items: [
          'Continuous monitoring of the high-risk miss rate after release',
          'Reviewer feedback captured as new ground-truth cases',
          'Clear escalation paths when the model is uncertain',
        ] },
      ]),
    ],
  },
  {
    slug: 'payorlens',
    no: '02',
    title: 'PayorLens',
    category: 'Product build',
    kind: 'AI governance & model evaluation platform',
    outcome:
      'A working governance platform that turns model metrics into a clear deployment decision, mapped to the NIST AI RMF.',
    summary:
      'From data validation to fairness, calibration and risk interpretation, packaged as reports executives and engineers can both act on.',
    tags: ['AI governance', 'NIST AI RMF', 'FastAPI', 'Streamlit'],
    role: 'Product vision, architecture and build',
    links: [
      { label: 'Live application', href: 'https://payorlens.streamlit.app/' },
      { label: 'GitHub', href: 'https://github.com/halley2904/payorlens' },
    ],
    disclosure:
      'The current demonstration uses CMS DE-SynPUF sample data, an engineered proxy denial label and a demonstration evaluation methodology. Its sample risk verdict is not a real healthcare deployment.',
    diagram: {
      title: 'From a model to a deployment decision',
      steps: [
        { label: 'Data validation', note: 'Is the input fit to use?' },
        { label: 'Performance & calibration', note: 'Is it right, and honest about it?' },
        { label: 'Fairness & robustness', note: 'Does it hold for everyone?' },
        { label: 'NIST AI RMF mapping', note: 'Which risks remain?' },
      ],
      outputs: ['Deploy', 'Deploy with conditions', 'Do not deploy'],
    },
    sections: [
      S('overview', 'Overview', [
        { type: 'p', text: 'PayorLens is an AI governance and model evaluation platform. It takes a model through data validation, performance, calibration, fairness and robustness checks, maps what it finds to the NIST AI RMF, and ends with a deployment decision and reports for both executive and technical readers.' },
      ]),
      S('problem', 'User & business problem', [
        { type: 'p', text: 'Model evaluations often end as a page of metrics that nobody outside the data team can act on. Leaders need a decision; engineers need the evidence behind it. Both usually get neither.' },
      ]),
      S('opportunity', 'Product opportunity', [
        { type: 'p', text: 'Make governance end in an action. Every check should feed a clear verdict with stated conditions, so evaluation becomes something a team uses before deployment rather than a document filed after it.' },
      ]),
      S('role', 'My role & ownership', [
        { type: 'list', items: [
          'Product vision and the end-to-end evaluation flow',
          'Architecture of the FastAPI service and Streamlit interface',
          'Choice of checks: validation, performance, calibration, fairness, robustness',
          'Risk interpretation, NIST AI RMF mapping and report design',
        ] },
      ]),
      S('discovery', 'Discovery & requirements', [
        { type: 'list', items: [
          'Two audiences, two reports: an executive summary and a technical appendix',
          'Every metric must explain what it means for the deployment decision',
          'The demo must be transparent about its data and methodology',
        ] },
      ]),
      S('decisions', 'Key decisions & trade-offs', [
        { type: 'decisions', items: [
          { decision: 'End every evaluation with a verdict, not just scores', tradeoff: 'Requires explicit thresholds and owning the judgment behind them.' },
          { decision: 'Include calibration, not only accuracy', tradeoff: 'More to explain, but a model that is confidently wrong is a governance risk.' },
          { decision: 'Map findings to the NIST AI RMF', tradeoff: 'Extra structure, in exchange for language risk and compliance teams already use.' },
          { decision: 'Disclose sample data and methodology inside the product', tradeoff: 'Less impressive demo, but honest about what the verdict can claim.' },
        ] },
      ]),
      S('workflow', 'Workflow & architecture', [
        { type: 'diagram' },
        { type: 'p', text: 'A FastAPI service runs the evaluation pipeline; a Streamlit application presents results, the risk interpretation and the generated reports.' },
      ]),
      S('visuals', 'Visual demonstrations', [{ type: 'links' }]),
      S('evaluation', 'Evaluation & success metrics', [
        { type: 'list', items: [
          'Every check produces an interpretable result linked to the verdict',
          'Executive report readable without the technical appendix',
          'Each identified risk traced to a NIST AI RMF function',
        ] },
      ]),
      S('outcomes', 'Outcomes & evidence', [
        { type: 'p', text: 'A working, deployed application and public codebase that run the full flow from validation to a deployment recommendation on demonstration data.' },
      ]),
      S('lessons', 'Limitations & lessons', [
        { type: 'p', text: 'The demonstration uses CMS DE-SynPUF sample data and an engineered proxy denial label, so its verdict shows how the decision is made, not a real-world result. Governance is only as useful as the decision it supports.' },
      ]),
      S('next', 'What I would build next', [
        { type: 'list', items: [
          'Monitoring that re-runs checks as data drifts after deployment',
          'Configurable thresholds per use case and risk appetite',
          'An audit trail of who accepted which conditions, and when',
        ] },
      ]),
    ],
  },
  {
    slug: 'scopeguard',
    no: '03',
    title: 'ScopeGuard',
    category: 'Product build',
    kind: 'AI-powered scope-change assessment',
    outcome:
      'An AI-assisted scope-change assessment product, taken from discovery to a six-screen prototype with guardrails and human sign-off.',
    summary:
      'Helping teams judge a scope change with evidence, honest uncertainty and a human making the final call.',
    tags: ['Product discovery', 'AI guardrails', 'Human in the loop', 'Prototype'],
    role: 'Discovery, product definition and prototype',
    links: [
      { label: 'Live prototype', href: 'https://scope-guard-7555.taskade.app/' },
      { label: 'Figma prototype', href: 'https://www.figma.com/proto/KymZhFuslnpeOCacflz3fJ/ScopeGuard---AI-Product-Prototype?node-id=12-10&t=Q8hfOJwNWstzNKVI1' },
    ],
    diagram: {
      title: 'A scope change, assessed with evidence',
      steps: [
        { label: 'Change request', note: 'What is being asked' },
        { label: 'Compare to agreed scope', note: 'Evidence-backed comparison' },
        { label: 'Structured assessment', note: 'Schema with guardrails' },
        { label: 'Uncertainty check', note: 'Flag what is unclear' },
      ],
      outputs: ['In scope', 'Needs a decision', 'Out of scope'],
    },
    sections: [
      S('overview', 'Overview', [
        { type: 'p', text: 'ScopeGuard assesses a scope-change request against what was originally agreed, shows the evidence behind its assessment, says clearly when it is unsure, and leaves the decision to a person.' },
      ]),
      S('problem', 'User & business problem', [
        { type: 'p', text: 'Scope changes often arrive informally and get judged on memory and pressure. Without a clear comparison to the agreed scope, teams absorb extra work quietly or argue without shared evidence.' },
      ]),
      S('opportunity', 'Product opportunity', [
        { type: 'p', text: 'Use AI for the slow part, comparing a request against agreed scope and surfacing the evidence, while keeping the judgment, and the accountability, with the team.' },
      ]),
      S('role', 'My role & ownership', [
        { type: 'list', items: [
          'Product discovery and problem definition',
          'User workflow and V1 prioritisation',
          'AI guardrails and output schemas',
          'Six-screen prototype and proposed success metrics',
        ] },
      ]),
      S('discovery', 'Discovery & requirements', [
        { type: 'list', items: [
          'The assessment must point to evidence, not just give an answer',
          'Uncertainty is shown, never hidden behind a confident tone',
          'A person approves the outcome before anything changes',
        ] },
      ]),
      S('decisions', 'Key decisions & trade-offs', [
        { type: 'decisions', items: [
          { decision: 'Structured output schemas instead of free text', tradeoff: 'Less flexible responses, far more predictable and reviewable.' },
          { decision: '"Needs a decision" as a first-class outcome', tradeoff: 'The product admits uncertainty instead of forcing a yes or no.' },
          { decision: 'A focused V1 around one workflow', tradeoff: 'Fewer features at launch, a clearer test of the core value.' },
        ] },
      ]),
      S('workflow', 'Workflow & architecture', [{ type: 'diagram' }]),
      S('visuals', 'Visual demonstrations', [{ type: 'links' }]),
      S('evaluation', 'Evaluation & success metrics', [
        { type: 'callout', text: 'Proposed metrics for a pilot. These are targets to measure, not results.' },
        { type: 'list', items: [
          'Share of assessments reviewers accept without major edits',
          'Time from request to a decision',
          'How often flagged uncertainty matched real ambiguity',
        ] },
      ]),
      S('outcomes', 'Outcomes & evidence', [
        { type: 'p', text: 'A defined V1 and a six-screen interactive prototype, with guardrails, output schemas and the human approval step designed in.' },
      ]),
      S('lessons', 'Limitations & lessons', [
        { type: 'p', text: 'ScopeGuard is a prototype and has not been tested with live teams. The strongest design choice was treating uncertainty as a valid product state rather than a failure to hide.' },
      ]),
      S('next', 'What I would build next', [
        { type: 'list', items: [
          'A pilot with real change requests to validate the proposed metrics',
          'Learning from reviewer edits to improve future assessments',
          'Integrations with the tools where requests already arrive',
        ] },
      ]),
    ],
  },
  {
    slug: 'whatsapp-strategy',
    no: '04',
    title: 'WhatsApp Product Strategy Teardown',
    category: 'Strategy',
    kind: 'Independent product analysis',
    outcome:
      'An independent teardown of how WhatsApp expands across six contexts without breaking the trust its core product depends on.',
    summary:
      'Context collision, user jobs, monetization versus trust, and an experiment with guardrails to test the recommendation.',
    tags: ['Product strategy', 'User jobs', 'Experimentation', 'Monetization'],
    role: 'Independent analysis and recommendations',
    links: [],
    disclosure:
      'Independent product analysis based on public information. It is not internal WhatsApp or Meta research.',
    diagram: {
      title: 'Six contexts, one product',
      steps: [
        { label: 'Personal chat', note: 'The trusted core' },
        { label: 'Groups & communities', note: 'Shared spaces' },
        { label: 'Business messaging', note: 'Brands enter the inbox' },
        { label: 'Payments & commerce', note: 'Money and trust' },
      ],
      outputs: ['Expand', 'Expand with guardrails', 'Protect the core'],
    },
    sections: [
      S('overview', 'Overview', [
        { type: 'p', text: 'A strategy teardown of WhatsApp across six contexts of use, looking at where its expansion creates value and where those contexts start to collide with the private, trusted experience that made it essential.' },
      ]),
      S('problem', 'User & business problem', [
        { type: 'p', text: 'Every new context brings new value and new risk. Business messages, payments and channels all compete with personal conversations for the same space and the same trust.' },
      ]),
      S('opportunity', 'Product opportunity', [
        { type: 'p', text: 'Expand by context rather than by feature: give each job a clear home, so new use cases grow without cluttering or cheapening personal messaging.' },
      ]),
      S('role', 'My role & ownership', [
        { type: 'list', items: [
          'Six-context product analysis',
          'User jobs and product architecture',
          'Monetization versus trust trade-offs',
          'Strategic recommendations, experiment and guardrail metrics',
        ] },
      ]),
      S('discovery', 'Discovery & requirements', [
        { type: 'p', text: 'The analysis maps each context to the job users hire it for, then looks for collisions: places where one context degrades another.' },
      ]),
      S('decisions', 'Key decisions & trade-offs', [
        { type: 'decisions', items: [
          { decision: 'Protect personal chat as the core', tradeoff: 'Slower monetization in the main inbox, in exchange for durable trust.' },
          { decision: 'Separate contexts by user job', tradeoff: 'More product surfaces, fewer collisions between them.' },
          { decision: 'Test before scaling, with guardrails', tradeoff: 'Slower rollout, but trust damage is caught early.' },
        ] },
      ]),
      S('workflow', 'Workflow & architecture', [{ type: 'diagram' }]),
      S('visuals', 'Visual demonstrations', [
        { type: 'callout', text: 'Context maps and artifacts from the teardown can be added here.' },
      ]),
      S('evaluation', 'Evaluation & success metrics', [
        { type: 'callout', text: 'A proposed experiment, not a result.' },
        { type: 'list', items: [
          'Primary metric: engagement with the new context being tested',
          'Guardrail: no drop in personal messaging activity',
          'Guardrail: no rise in blocks, reports or opt-outs',
        ] },
      ]),
      S('outcomes', 'Outcomes & evidence', [
        { type: 'p', text: 'A structured strategy document with recommendations and a testable experiment design.' },
      ]),
      S('lessons', 'Limitations & lessons', [
        { type: 'p', text: 'Built from public information only, without internal data, so the recommendations are hypotheses to test. The core lesson: growth that spends user trust is borrowed, not earned.' },
      ]),
      S('next', 'What I would build next', [
        { type: 'list', items: [
          'A user-research plan to validate the context collisions',
          'Sizing for each recommendation with available public data',
        ] },
      ]),
    ],
  },
];

export const evaluation = [
  { title: 'LLM evaluation & benchmarking', fact: '712 expert-reviewed cases', implication: 'Quality is defined before launch, against cases experts agree on, not discovered later through complaints.' },
  { title: 'Regression testing', fact: 'Every change re-tested', implication: 'A better prompt or model cannot quietly break what already worked.' },
  { title: 'Vision-language model evaluation', fact: '7,500+ images evaluated', implication: 'Model choice is based on how it performs on the real task, not on a leaderboard.' },
  { title: 'RAG & AI workflows', fact: 'Grounded answers', implication: 'Answers trace back to sources, so users can check them and trust them.' },
  { title: 'Data pipelines & structured extraction', fact: 'Clean inputs, typed outputs', implication: 'Messy documents become data the product can reliably act on.' },
  { title: 'Model monitoring & governance', fact: 'After launch, too', implication: 'Drift and failure are noticed early and lead to a decision, not a report.' },
];

export const principles = [
  { title: 'Evidence over confidence.', body: 'A confident output is not a correct one. I ask what the answer rests on, and design products that show their evidence.', from: 'ScopeGuard' },
  { title: 'Uncertainty is a valid product state.', body: '"Needs a decision" is a real outcome. Forcing a yes or no hides risk; showing uncertainty lets people act on it.', from: 'ScopeGuard' },
  { title: 'Governance must lead to actionable decisions.', body: 'An evaluation that ends in a page of metrics has not finished. It should end in deploy, deploy with conditions, or do not deploy.', from: 'PayorLens' },
  { title: 'Human control over consequential AI decisions.', body: 'When a wrong call has a real cost, the AI supports the decision and an accountable person makes it.', from: 'Payer AI & Clinical Risk' },
  { title: 'Contextual expansion without damaging the core.', body: 'New use cases should grow around the core experience, never at its expense.', from: 'WhatsApp teardown' },
];

export const about = {
  intro:
    'I started in data science and moved toward product because the most interesting questions were never only technical. Which problem is worth solving? What does good look like? What happens when the model is wrong? I enjoy holding the business problem and the technical system in the same picture.',
  education: [
    { title: 'Diploma in Data Science and Applications', place: 'IIT Madras', note: 'CGPA 8.40 / 10' },
    { title: 'BSc Data Science', place: 'Gujarat University', note: '' },
  ],
  path: [
    { title: 'Data Science & ML Intern', note: 'Where it started' },
    { title: 'Data Scientist', note: 'Evaluation, pipelines and AI workflows' },
    { title: 'Next: AI Product Management', note: 'Where I am heading' },
  ],
  strengths: ['Product definition', 'AI evaluation', 'Stakeholder collaboration', 'Requirements from domain rules', 'Experiment design'],
  interests: 'AI product management, technical product strategy, and building products that are genuinely useful.',
};
