import {
  GitBranch,
  GitCommit,
  FileCode,
  Cpu,
  Box,
  Filter,
  GitPullRequest,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Radio,
  Clock,
  Code2,
  HardDrive,
  Database,
  Terminal,
  Target,
  Sparkles,
  Boxes,
  Workflow
} from 'lucide-react';

/* =========================================================================
   1. CENTRALIZED COLOR PALETTE & DESIGN TOKENS
   ========================================================================= */
export const colorPalette = {
  primary: {
    cyan: '#06b6d4',
    cyanBright: '#22d3ee',
    emerald: '#10b981',
    emeraldBright: '#34d399',
    gradient: 'from-cyan-400 to-emerald-400',
    gradientText: 'from-cyan-600 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400',
  },
  accent: {
    amber: '#f59e0b',
    purple: '#a855f7',
    rose: '#f43f5e',
    blue: '#3b82f6',
  },
  bg: {
    darkRoot: '#07090e',
    darkCard: '#0e131f',
    darkNested: '#151c2d',
    darkTerminal: '#050811',
    darkSubTerminal: '#04060a',
    lightRoot: '#f8fafc',
    lightCard: '#ffffff',
    lightNested: '#f1f5f9',
  },
  border: {
    darkDefault: 'border-slate-800',
    lightDefault: 'border-slate-200',
    cyanAccent: 'border-cyan-500/30',
    emeraldAccent: 'border-emerald-500/30',
    roseAccent: 'border-rose-500/30',
  }
};

/* =========================================================================
   2. NAVBAR NAVIGATION LINKS
   ========================================================================= */
export const navLinks = [
  { name: "Overview", href: "home" },
  { name: "How It Works", href: "pipeline" },
  { name: "Sandbox Moat", href: "sandbox" },
  { name: "Old vs SparkLens", href: "comparison" },
  { name: "Coming Soon", href: "coming-soon" },
];

/* =========================================================================
   3. HERO SECTION DATA
   ========================================================================= */
export const heroData = {
  statusBadge: {
    label: "Autonomous Security Guard",
    sub: "Real Proof, Zero False Alarms",
    icon: Sparkles
  },
  headline: {
    prefix: "Stop Wasting Time on Fake Bugs.",
    gradient: "Prove Real Exploits",
    suffix: "in Safe Cleanrooms."
  },
  valueProposition: "Most code scanners cry wolf with 85% false alarms. SparkLens safeguards your codebase by testing issues inside isolated, air-gapped sandboxes to prove if bugs are real — then delivers clean, maintainable Pull Requests that protect your code quality and guarantee all tests pass without regressions.",
  ctaButtons: {
    primary: { label: "Get Early Access", target: "coming-soon" },
    secondary: { label: "See How It Works", target: "pipeline", icon: Boxes }
  },
  trustBadges: [
    { icon: CheckCircle2, text: "High Code Quality & Maintainability", color: "text-emerald-500" },
    { icon: ShieldCheck, text: "Catches & Neutralizes Real Bugs", color: "text-cyan-500" },
    { icon: Radio, text: "100% Reliable Air-Gapped Sandbox", color: "text-rose-500" }
  ],
  initialTerminalLogs: [
    { type: 'CMD', text: 'sparklens verify --repo my-app/auth --branch main', color: 'text-cyan-400' },
    { type: 'STEP 1', text: 'GitHub commit received: scanning code for vulnerabilities...', color: 'text-slate-300' },
    { type: 'STEP 2', text: 'Found possible SQL leak at src/auth.js:42', color: 'text-amber-400' },
    { type: 'STEP 3', text: 'Launching secure, isolated test sandbox...', color: 'text-purple-400' },
    { type: 'READY', text: 'Click "Run Cleanroom Test" to verify if the bug is real...', color: 'text-emerald-400' }
  ],
  simulationLogs: {
    stage1: [
      { type: 'CONTAINER', text: 'Starting isolated sandbox (no internet access permitted)', color: 'text-cyan-400' },
      { type: 'SECURITY', text: 'Air-gap locked: safe environment created in 0.2s', color: 'text-purple-400' },
      { type: 'TEST RUN', text: 'Sending safe test attack to check vulnerability...', color: 'text-amber-400' }
    ],
    stage2: [
      { type: 'EXECUTE', text: 'Running test payload against application...', color: 'text-slate-300' },
      { type: 'VERIFIED', text: 'BUG CONFIRMED: Real SQL injection found and reproduced!', color: 'text-rose-400 font-bold' }
    ],
    stage3: [
      { type: 'SUCCESS', text: 'Empirically proven in 1.42s • 100% real, not a false alarm', color: 'text-emerald-400 font-bold' },
      { type: 'FIX CODE', text: 'Auto-generating surgical fix and running all project tests...', color: 'text-cyan-300' },
      { type: 'READY PR', text: 'Pull Request #42 generated with 100% tests passing!', color: 'text-emerald-400 font-bold' }
    ]
  },
  terminalTelemetry: {
    egress: "INTERNET: BLOCKED (SAFE)",
    ram: "MEMORY: 148 / 1024 MB",
    status: "● SAFE ISOLATION ACTIVE"
  },
  verificationFlow: {
    title: "HOW SPARKLENS WORKS IN 4 SIMPLE STEPS",
    subtitle: "From Code Commit to Verified 1-Click Fix",
    nodes: [
      {
        step: '01',
        icon: GitCommit,
        title: '1. Connect GitHub',
        desc: 'Instant Webhook Hookup',
        sub: 'Secure, zero-setup connection to your repo',
        color: 'text-cyan-500 dark:text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30'
      },
      {
        step: '02',
        icon: FileCode,
        title: '2. Scan Code Paths',
        desc: 'Find Suspicious Flows',
        sub: 'Traces untrusted data directly to database calls',
        color: 'text-amber-500 dark:text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30'
      },
      {
        step: '03',
        icon: Box,
        title: '3. Test in Sandbox',
        desc: 'Prove It Actually Breaks',
        sub: 'Runs a real test inside an air-gapped container',
        color: 'text-purple-500 dark:text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      },
      {
        step: '04',
        icon: GitPullRequest,
        title: '4. 1-Click PR Fix',
        desc: 'Pre-Tested Solution',
        sub: 'Ready to merge with all your unit tests passing',
        color: 'text-emerald-500 dark:text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      }
    ]
  },
  metrics: [
    {
      icon: Target,
      color: 'text-cyan-500 dark:text-cyan-400',
      num: '93.3%',
      label: 'True Accuracy',
      sub: 'vs only 67% on typical static tools',
      bar: '93.3%',
      barColor: 'bg-cyan-500'
    },
    {
      icon: Filter,
      color: 'text-emerald-500 dark:text-emerald-400',
      num: '82.6%',
      label: 'False Alarms Dropped',
      sub: 'Never wastes your time on non-issues',
      bar: '82.6%',
      barColor: 'bg-emerald-500'
    },
    {
      icon: Zap,
      color: 'text-amber-500 dark:text-amber-400',
      num: '78.7%',
      label: 'Dev Hours Saved',
      sub: '1 minute review vs 5+ min manual debugging',
      bar: '78.7%',
      barColor: 'bg-amber-500'
    },
    {
      icon: Lock,
      color: 'text-purple-500 dark:text-purple-400',
      num: '100% Safe',
      label: 'Air-Gapped Cleanroom',
      sub: 'Zero internet access; your code stays private',
      bar: '100%',
      barColor: 'bg-purple-500'
    }
  ]
};

/* =========================================================================
   4. VISUAL PIPELINE (THE 5-STAGE GOLDEN PATH) DATA
   ========================================================================= */
export const pipelineData = {
  header: {
    badge: "Simple 5-Step Pipeline",
    title: "How SparkLens Protects Your Code",
    subtitle: "From your git commit to an approved pull request, every step is tested automatically with zero human effort:"
  },
  steps: [
    {
      step: '01',
      title: 'GitHub Auto-Sync',
      tag: 'Instant Repo Hookup',
      icon: GitBranch,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      badge: 'STEP 1: LISTENING',
      desc: 'Connects directly to your GitHub repository in 1 click. Whenever anyone pushes code or creates a Pull Request, SparkLens immediately inspects the new lines.',
      features: [
        { icon: Lock, label: 'Secure GitHub webhook integration' },
        { icon: Layers, label: 'Fast checkout without slowing your git pipeline' },
        { icon: Code2, label: 'Auto-detects Node.js, Python, Java, Go, and more' }
      ]
    },
    {
      step: '02',
      title: 'Smart Code Scanner',
      tag: 'Locates Untrusted Inputs',
      icon: Cpu,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      badge: 'STEP 2: SCANNING',
      desc: 'Parses your code structure to track untrusted user data. It pinpoints exactly where suspicious input reaches critical database queries or shell commands.',
      features: [
        { icon: Code2, label: 'Accurate syntax-tree analysis (not crude regex)' },
        { icon: Cpu, label: 'Traces data from web API routes down to database queries' },
        { icon: Zap, label: 'Finishes full scan in under 2 seconds' }
      ]
    },
    {
      step: '03',
      title: 'Air-Gapped Cleanroom',
      tag: 'Safe Sandbox Testing',
      icon: Box,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      badge: 'STEP 3: TESTING',
      desc: 'Here is what makes SparkLens special: instead of guessing, it creates a temporary, air-gapped container with NO internet access and safely tests if the bug can actually be exploited.',
      features: [
        { icon: Radio, label: '100% disconnected from the internet (zero data leaves)' },
        { icon: HardDrive, label: 'Temporary container destroyed immediately after test' },
        { icon: Clock, label: 'Automatic 30-second timeout safety watchdog' }
      ]
    },
    {
      step: '04',
      title: 'Smart Noise Filter',
      tag: 'Throws Away Fake Bugs',
      icon: Filter,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      badge: 'STEP 4: FILTERING',
      desc: 'If the test fails because the code was already protected or unreachable, SparkLens silently discards the alert. You are only notified when a vulnerability is 100% real.',
      features: [
        { icon: Filter, label: 'Eliminates 82.6% of false alarms before you ever see them' },
        { icon: ShieldCheck, label: 'Every alert comes with reproducible proof' },
        { icon: Clock, label: 'Saves developers 4+ hours of wasted triage every sprint' }
      ]
    },
    {
      step: '05',
      title: '1-Click Pull Request',
      tag: 'Maintains Code Quality & Fixes Bugs',
      icon: GitPullRequest,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      badge: 'STEP 5: SOLVED',
      desc: 'SparkLens generates clean, idiomatic fixes that strictly follow your team coding style. It verifies the fix against your entire test suite to maintain high code quality and prevent regressions.',
      features: [
        { icon: CheckCircle2, label: 'Protects code quality: 100% existing tests pass' },
        { icon: Code2, label: 'High maintainability: clean, minimal, readable code changes' },
        { icon: GitPullRequest, label: 'Production-ready reliability: 1-click merge with zero bugs' }
      ]
    }
  ]
};

/* =========================================================================
   5. VISUAL SANDBOX (CLEANROOM RIG) DATA
   ========================================================================= */
export const sandboxData = {
  header: {
    badge: "100% Isolated Testing",
    title: "Safe, Air-Gapped Test Sandboxes",
    subtitle: "SparkLens never alerts developers unless the bug actually breaks something inside a safe, isolated container with NO internet access:"
  },
  hardwareBadges: [
    { icon: Radio, label: 'INTERNET', val: 'Blocked (Air-Gapped)', sub: 'Zero data leaves your machine', color: 'text-rose-500 dark:text-rose-400' },
    { icon: Cpu, label: 'MEMORY & CPU', val: '1024 MB • 1 Core', sub: 'Strict container limit', color: 'text-cyan-500 dark:text-cyan-400' },
    { icon: HardDrive, label: 'STORAGE', val: 'Temporary RAM Only', sub: 'Deleted after verification', color: 'text-purple-500 dark:text-purple-400' },
    { icon: Clock, label: 'SAFETY TIMER', val: '30s Auto Shut-off', sub: 'Guaranteed termination', color: 'text-amber-500 dark:text-amber-400' }
  ],
  scenarioTabs: [
    { id: 'sqli', label: '1. SQL Database Leak', icon: Database },
    { id: 'cmd', label: '2. Terminal Command Exploit', icon: Terminal },
    { id: 'proto', label: '3. Data Override Bug', icon: Layers },
  ],
  scenarios: {
    sqli: {
      name: 'SQL Database Leak',
      cwe: 'CWE-89: SQL Injection',
      icon: Database,
      harness: 'test_sql_attack.js',
      status: 'VERIFIED EXPLOITABLE',
      latency: '1.42s',
      ramUsed: '148 MB',
      ramPercent: '15%',
      latencyPercent: '22%',
      egress: '0 Packets (Internet Blocked)',
      payload: "{'username': \"' OR 1=1 --\"}",
      logs: [
        'CONTAINER: Secure Node.js test container created (1024MB RAM)',
        'SECURITY: Internet disconnected, read-only system, RAM temporary disk',
        'TEST INPUT: {"username": "\' OR 1=1 --"} injected into login query',
        'EXECUTE: Running test against auth controller with 30s safety timer...',
        'CONFIRMATION: [ASSERT_TRUE] Database returned admin account without password!',
        'VERIFIED: Vulnerability 100% confirmed real in 1.42 seconds'
      ]
    },
    cmd: {
      name: 'Terminal Command Exploit',
      cwe: 'CWE-78: Command Injection',
      icon: Terminal,
      harness: 'test_command_attack.js',
      status: 'VERIFIED EXPLOITABLE',
      latency: '1.12s',
      ramUsed: '136 MB',
      ramPercent: '14%',
      latencyPercent: '18%',
      egress: '0 Packets (Internet Blocked)',
      payload: 'file.png; id; whoami',
      logs: [
        'CONTAINER: Secure Node.js test container created (1024MB RAM)',
        'SECURITY: Internet disconnected, read-only system, RAM temporary disk',
        'TEST INPUT: "file.png; id; whoami" passed into image upload handler',
        'EXECUTE: Child terminal process intercepted by sandbox monitor...',
        'CONFIRMATION: System command executed outside normal application flow!',
        'VERIFIED: Command execution vulnerability confirmed in 1.12 seconds'
      ]
    },
    proto: {
      name: 'Data Override Bug',
      cwe: 'CWE-1321: Prototype Pollution',
      icon: Layers,
      harness: 'test_prototype_attack.js',
      status: 'VERIFIED EXPLOITABLE',
      latency: '0.98s',
      ramUsed: '112 MB',
      ramPercent: '11%',
      latencyPercent: '15%',
      egress: '0 Packets (Internet Blocked)',
      payload: '{"__proto__": {"isAdmin": true}}',
      logs: [
        'CONTAINER: Secure Node.js test container created (1024MB RAM)',
        'SECURITY: Internet disconnected, read-only system, RAM temporary disk',
        'TEST INPUT: {"__proto__": {"isAdmin": true}} passed into JSON parser',
        'EXECUTE: Checking if global user permissions are overwritten...',
        'CONFIRMATION: Non-admin user granted admin privileges globally!',
        'VERIFIED: Data corruption vulnerability confirmed in 0.98 seconds'
      ]
    }
  }
};

/* =========================================================================
   6. VISUAL COMPARISON (OLD SCANNERS VS SPARKLENS) DATA
   ========================================================================= */
export const comparisonData = {
  header: {
    badge: "Side-by-Side Comparison",
    title: "Old Static Scanners vs SparkLens",
    subtitle: "See why modern engineering teams switch from theoretical pattern guessing to verified container testing:"
  },
  vectors: {
    noise: {
      id: 'noise',
      tabLabel: '1. False Alarm Rate',
      icon: Target,
      tag: 'NOISE REDUCTION',
      legacy: {
        headline: '85% False Alarm Rate',
        badge: '70%–85% FAKE WARNINGS',
        desc: 'Old tools look for keywords with simple text matching. They flag protected code, disabled features, and dead functions, wasting hours of engineering time.',
        cost: '4+ hours wasted per engineer every sprint triaging non-existent bugs',
        tags: ['Blind Text Matching', 'Alert Fatigue', 'Dead Code Flagged'],
        codeLines: [
          { text: '[ALERT] Possible SQL problem at src/query.js:14', color: 'text-slate-300' },
          { text: '>> Code is already protected by internal framework sanitizer', color: 'text-rose-400 font-bold' },
          { text: '>> Tool status: FLAGGED ANYWAY (Developer must check manually)', color: 'text-slate-500' }
        ]
      },
      sparklens: {
        headline: '93.3% True Accuracy (No Noise)',
        badge: '82.6% FAKE BUGS DROPPED',
        desc: 'SparkLens runs an actual test in a safe sandbox. If the bug cannot be triggered because the code is safe, SparkLens throws away the alert silently.',
        benefit: 'Zero spam: you only get alerted when a security vulnerability is 100% verified real',
        tags: ['Proven Real Exploits', 'Zero Developer Spam', 'Clean Notification Queue'],
        codeLines: [
          { text: '[SANDBOX] Testing possible SQL bug in isolated container...', color: 'text-slate-300' },
          { text: '>> Sanitizer successfully stopped test payload (Exit Code 1)', color: 'text-emerald-400 font-bold' },
          { text: '>> False alarm automatically discarded (0 developers bothered)', color: 'text-cyan-400' }
        ]
      }
    },
    proof: {
      id: 'proof',
      tabLabel: '2. Real Proof vs Guessing',
      icon: Box,
      tag: 'RUNTIME TEST PROOF',
      legacy: {
        headline: 'Guesses Without Testing',
        badge: 'THEORETICAL GUESSING',
        desc: 'Legacy tools never run the code. They just stare at text files and guess whether a bug might exist, leaving developers with zero proof.',
        cost: 'Real critical bugs get buried under a pile of hundreds of harmless warnings',
        tags: ['Never Runs Code', 'Pure Speculation', 'No Reproducible Steps'],
        codeLines: [
          { text: 'Static Rule: "Warning: found string concatenation in SQL call"', color: 'text-slate-300' },
          { text: '>> Did it actually break? Tool has no idea', color: 'text-rose-400' },
          { text: '>> Reproducibility: UNKNOWN (You have to figure it out)', color: 'text-slate-500' }
        ]
      },
      sparklens: {
        headline: 'Tests Everything in a Real Container',
        badge: 'SAFE AIR-GAPPED TESTING',
        desc: 'Spawns an isolated container with zero internet access and runs a safe reproduction test. You receive the exact logs and proof.',
        benefit: 'You get exact proof showing how the vulnerability was tested and confirmed',
        tags: ['Air-Gapped Container', 'Exact Log Output', 'Reproducible in 1-Click'],
        codeLines: [
          { text: '[TEST RIG] Running attack payload in Node.js test container...', color: 'text-slate-300' },
          { text: '>> Confirmed: Endpoint returned unauthorized data in 1.42s', color: 'text-emerald-400 font-bold' },
          { text: '>> Exact reproduction test script saved to verify fix', color: 'text-cyan-400' }
        ]
      }
    },
    patch: {
      id: 'patch',
      tabLabel: '3. Code Quality & Maintainability',
      icon: GitPullRequest,
      tag: 'CODE QUALITY & STABILITY',
      legacy: {
        headline: 'Broken AI Suggestions Harm Code Quality',
        badge: 'CORRUPTS CODEBASE',
        desc: 'Generic AI bots generate sloppy code with unexpected side effects, unmaintained third-party dependencies, and syntax errors that corrupt your codebase quality and break existing test suites.',
        cost: 'Developers waste hours refactoring sloppy AI code and fixing broken unit tests',
        tags: ['Messy Code Diffs', 'Broken Unit Tests', 'Poor Maintainability'],
        codeLines: [
          { text: 'AI Bot Suggestion applied to branch...', color: 'text-slate-300' },
          { text: '>> Tests failed: 14 failed, 28 passed (TypeError: helper is undefined)', color: 'text-rose-400 font-bold' },
          { text: '>> Code quality degraded: unmaintainable spaghetti patch', color: 'text-slate-500' }
        ]
      },
      sparklens: {
        headline: 'Clean, Maintainable & Reliable Code Patches',
        badge: 'HIGH QUALITY & ZERO REGRESSIONS',
        desc: 'SparkLens maintains high code quality by writing clean, idiomatic patches that follow your project style. It guarantees 100% test passage and protects software reliability.',
        benefit: 'Production-ready reliability: beautiful, readable diffs that protect your codebase from bugs',
        tags: ['All Tests Green', 'High Maintainability', 'Bug-Free Production'],
        codeLines: [
          { text: 'Running test suite against auto-generated fix...', color: 'text-slate-300' },
          { text: '>> All 42/42 existing project tests pass with zero errors', color: 'text-emerald-400 font-bold' },
          { text: '>> Code quality verified: 0 regressions, clean maintainable diff', color: 'text-cyan-400' }
        ]
      }
    },
    triage: {
      id: 'triage',
      tabLabel: '4. Developer Time Saved',
      icon: Clock,
      tag: 'SPEED & PRODUCTIVITY',
      legacy: {
        headline: '5+ Minutes Spent per Warning',
        badge: 'SLOWS DOWN SPRINTS',
        desc: 'Every alert forces an engineer to stop coding, open a ticket, inspect the files, search logs, and manually figure out if it is harmless.',
        cost: 'Development sprint delivery delayed by 15% to 20% on security chores',
        tags: ['Context Switching', 'Reading Through Logs', 'Sprint Slowdowns'],
        codeLines: [
          { text: '1. Read security scanner ticket (1 min)', color: 'text-slate-300' },
          { text: '2. Search through repo files to find the route (2.5 mins)', color: 'text-slate-300' },
          { text: '3. Realize it was harmless dead code (2 mins wasted)', color: 'text-slate-300' }
        ]
      },
      sparklens: {
        headline: 'Review & Merge in 1 Minute',
        badge: '78.7% TIME SAVED',
        desc: 'You only get notified when a bug is confirmed real. SparkLens hands you the ready-made Pull Request with all tests passing.',
        benefit: 'Review takes under 60 seconds: look at the passing tests and click "Merge"',
        tags: ['Under 1 Minute', 'Zero Guesswork', 'Fast Sprints'],
        codeLines: [
          { text: '1. Open pre-tested GitHub PR (15 seconds)', color: 'text-slate-300' },
          { text: '2. Check test verification proof (30 seconds)', color: 'text-slate-300' },
          { text: '3. Click "Merge Pull Request" (15 seconds)', color: 'text-slate-300' }
        ]
      }
    },
    privacy: {
      id: 'privacy',
      tabLabel: '5. Privacy & Security',
      icon: Lock,
      tag: 'DATA PRIVACY',
      legacy: {
        headline: 'Sends Your Code to 3rd Parties',
        badge: 'PRIVACY RISK',
        desc: 'Cloud scanners and online AI services upload your proprietary source code and config files over the public internet to third-party servers.',
        cost: 'Creates security risks, compliance headaches, and proprietary leaks',
        tags: ['Code Uploaded to Cloud', 'Third-Party Retention', 'Compliance Risk'],
        codeLines: [
          { text: 'POST https://api.cloud-scanner.com/upload-repo', color: 'text-slate-300' },
          { text: '>> Source code uploaded to external cloud servers', color: 'text-rose-400 font-bold' },
          { text: '>> Stored in external database outside your control', color: 'text-slate-500' }
        ]
      },
      sparklens: {
        headline: '100% Air-Gapped (Never Leaves You)',
        badge: 'ZERO INTERNET ACCESS',
        desc: 'Test containers are completely disconnected from the internet. No external network traffic is physically possible.',
        benefit: 'Complete privacy: your company source code never leaves your designated execution runtime',
        tags: ['No Internet Connection', 'Zero Data Retention', '100% Private'],
        codeLines: [
          { text: '[AIR-GAP] Starting container with network = NONE', color: 'text-slate-300' },
          { text: '>> External traffic blocked by OS kernel: 0 packets allowed', color: 'text-emerald-400 font-bold' },
          { text: '>> Code executed locally in RAM, wiped immediately', color: 'text-cyan-400' }
        ]
      }
    }
  },
  summaryCards: [
    {
      icon: Target,
      title: "93.3% True Accuracy",
      sub: "vs only 67% on traditional static tools",
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      icon: Filter,
      title: "82.6% False Alarms Dropped",
      sub: "Discarded before a developer is ever alerted",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Clock,
      title: "78.7% Triage Time Saved",
      sub: "Under 1 minute review vs 5+ min manual debugging",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10"
    }
  ]
};

/* =========================================================================
   7. COMING SOON SECTION DATA
   ========================================================================= */
export const comingSoonData = {
  badge: "PRIVATE ALPHA • LAUNCHING SOON",
  headline: {
    title: "SPARKLENS",
    gradient: "IS COMING SOON"
  },
  subtitle: "The smart security assistant that tests code in safe, isolated sandboxes and opens ready-to-merge Pull Requests with zero false alarms.",
  capabilityPills: [
    { icon: GitBranch, label: '1-Click GitHub Setup', sub: 'Instant connection with zero setup', color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: Box, label: '100% Reliable Sandbox', sub: 'Isolated testing environment with 0 egress', color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Code2, label: 'High Code Quality', sub: 'Clean, maintainable patches without tech debt', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' },
    { icon: GitPullRequest, label: 'Zero-Regression PRs', sub: '100% of your unit & integration tests pass', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: ShieldCheck, label: 'Bug Protection Guard', sub: 'Catches & neutralizes real vulnerabilities', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Clock, label: 'Proven Maintainability', sub: 'Clear git history with verified diff logs', color: 'text-rose-500 dark:text-rose-400', bg: 'bg-rose-500/10' }
  ],
  vipPass: {
    badge: "EARLY ACCESS VIP PASS",
    tag: "INSTANT ACCESS QUEUE",
    desc: "Join engineering teams testing SparkLens in private preview. Enter your work email below to reserve your priority sandbox access.",
    queue: "Queue: Priority Engineering Access",
    guarantee: "100% Zero Spam Guaranteed",
    placeholder: "Enter your work email address",
    ctaDefault: "Reserve Early Access Pass",
    ctaSubmitting: "Saving to Google Sheet...",
    successHeading: "You're on the priority VIP list!",
    successSub: "Your email has been recorded in our sheet. We'll send your sandbox credentials shortly."
  }
};

/* =========================================================================
   8. FOOTER DATA
   ========================================================================= */
export const footerData = {
  brand: "SPARKLENS",
  copyright: "© 2026–2027",
  affiliation: "Autonomous Sandbox Security • Quantum University",
  links: [
    { name: "How It Works", href: "pipeline", icon: Workflow },
    { name: "Sandbox Rig", href: "sandbox", icon: Box },
    { name: "Coming Soon", href: "coming-soon", icon: Sparkles, isBold: true }
  ]
};
