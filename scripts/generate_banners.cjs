const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/portfolio');

// Common background SVG defs (dot grid, gradients, filters)
const commonDefs = `
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B15"/>
      <stop offset="45%" stop-color="#091427"/>
      <stop offset="100%" stop-color="#0C1A32"/>
    </linearGradient>

    <linearGradient id="windowBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F1F38" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0A1528" stop-opacity="0.98"/>
    </linearGradient>

    <!-- Accent Gradients -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>

    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>

    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>

    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>

    <!-- Radial Glows -->
    <radialGradient id="centerGlowCyan" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#0284C7" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#0369A1" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#050B15" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="centerGlowViolet" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="#6D28D9" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#050B15" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="centerGlowAmber" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#D97706" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="#B45309" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#050B15" stop-opacity="0"/>
    </radialGradient>

    <!-- Dot Grid Pattern -->
    <pattern id="dotPattern" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#38BDF8" opacity="0.18"/>
    </pattern>

    <!-- Window Shadow -->
    <filter id="windowShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
`;

// 1. DATA WHISPERER (LangChain Agent chatbot UI mockup with a bar chart)
const dataWhispererSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  ${commonDefs}

  <!-- Base background -->
  <rect width="1280" height="720" fill="url(#bgGrad)"/>
  <rect width="1280" height="720" fill="url(#dotPattern)"/>
  <rect width="1280" height="720" fill="url(#centerGlowCyan)"/>

  <!-- Subtle grid lines -->
  <g stroke="#1E293B" stroke-width="1" opacity="0.25">
    <line x1="0" y1="120" x2="1280" y2="120"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="160" y1="0" x2="160" y2="720"/>
    <line x1="1120" y1="0" x2="1120" y2="720"/>
  </g>

  <!-- TOP-LEFT PILL BADGE (Core Technique) -->
  <g transform="translate(56, 36)">
    <rect x="0" y="0" width="290" height="38" rx="19" fill="#0E1E38" stroke="#06B6D4" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#06B6D4"/>
    <text x="36" y="24" fill="#F0F9FF" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1">LANGCHAIN REACT AGENT</text>
  </g>

  <!-- TOP-RIGHT STAT BADGE (Key Metric) -->
  <g transform="translate(864, 36)">
    <rect x="0" y="0" width="360" height="38" rx="19" fill="#0E1E38" stroke="#34D399" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#34D399"/>
    <text x="36" y="24" fill="#6EE7B7" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="0.5">91.0% QUERY ACCURACY</text>
    <text x="224" y="24" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">• Llama 3.3 70B</text>
  </g>

  <!-- CENTERED UI MOCKUP WINDOW -->
  <g transform="translate(140, 96)" filter="url(#windowShadow)">
    <!-- Outer Window Card (Width: 1000, Height: 570) -->
    <rect x="0" y="0" width="1000" height="570" rx="18" fill="url(#windowBg)" stroke="#1E3252" stroke-width="1.5"/>

    <!-- Window Top Header Bar -->
    <rect x="0" y="0" width="1000" height="46" rx="18" fill="#11233E"/>
    <!-- Window buttons -->
    <circle cx="26" cy="23" r="5.5" fill="#EF4444"/>
    <circle cx="44" cy="23" r="5.5" fill="#F59E0B"/>
    <circle cx="62" cy="23" r="5.5" fill="#10B981"/>
    
    <!-- Title / Breadcrumb in header -->
    <text x="96" y="28" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12">data-whisperer // autonomous-analytics-agent.py</text>
    
    <!-- Status badge on header right -->
    <rect x="850" y="10" width="126" height="26" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1"/>
    <circle cx="866" cy="23" r="3.5" fill="#34D399"/>
    <text x="878" y="27" fill="#6EE7B7" font-family="system-ui, sans-serif" font-size="11" font-weight="700">REPL CONNECTED</text>

    <!-- Sub-header: Dataset info -->
    <g transform="translate(32, 62)">
      <rect x="0" y="0" width="936" height="34" rx="8" fill="#0A1526" stroke="#1B2D49" stroke-width="1"/>
      <text x="16" y="22" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="11" font-weight="600">CSV DATASET:</text>
      <text x="115" y="22" fill="#E2E8F0" font-family="ui-monospace, monospace" font-size="11">marketing_campaign_roas.csv (12,450 rows × 8 cols)</text>
      <text x="740" y="22" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">GROQ LLAMA 3.3 • 320ms</text>
    </g>

    <!-- User Chat Query Bubble -->
    <g transform="translate(32, 110)">
      <rect x="0" y="0" width="936" height="52" rx="10" fill="#152744" stroke="#0284C7" stroke-width="1.2"/>
      <rect x="14" y="14" width="60" height="24" rx="6" fill="#0284C7" fill-opacity="0.3"/>
      <text x="24" y="30" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">USER</text>
      <text x="86" y="31" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="500">"Compare revenue performance across marketing channels and plot a comparison bar chart"</text>
    </g>

    <!-- Agent Autonomous Reasoning Step -->
    <g transform="translate(32, 174)">
      <rect x="0" y="0" width="936" height="42" rx="8" fill="#0C1B30" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="16" y="26" fill="#C084FC" font-family="ui-monospace, monospace" font-size="11" font-weight="700">[THOUGHT &amp; ACTION]:</text>
      <text x="165" y="26" fill="#CBD5E1" font-family="ui-monospace, monospace" font-size="11">df.groupby('channel')['revenue_k'].sum().plot(kind='bar') -> Executing Python REPL sandbox...</text>
      <circle cx="905" cy="21" r="4" fill="#34D399"/>
      <text x="850" y="25" fill="#34D399" font-family="ui-monospace, monospace" font-size="10">SUCCESS</text>
    </g>

    <!-- Generated Interactive Bar Chart Visualization Card -->
    <g transform="translate(32, 228)">
      <rect x="0" y="0" width="936" height="260" rx="12" fill="#071222" stroke="#1E3252" stroke-width="1.2"/>
      
      <!-- Chart Title & Tools -->
      <text x="24" y="32" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Marketing Channel Revenue Contribution (USD $k)</text>
      <text x="24" y="50" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Generated via Matplotlib / Seaborn Integration</text>

      <rect x="790" y="16" width="122" height="26" rx="6" fill="#1E293B" stroke="#334155"/>
      <text x="804" y="33" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Export PNG / CSV</text>

      <!-- Chart Grid & Horizontal Lines -->
      <g stroke="#1E2E48" stroke-width="1" stroke-dasharray="3,3">
        <line x1="90" y1="80" x2="880" y2="80"/>
        <line x1="90" y1="125" x2="880" y2="125"/>
        <line x1="90" y1="170" x2="880" y2="170"/>
        <line x1="90" y1="215" x2="880" y2="215"/>
      </g>

      <!-- Y-Axis Labels -->
      <text x="75" y="84" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$500k</text>
      <text x="75" y="129" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$375k</text>
      <text x="75" y="174" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$250k</text>
      <text x="75" y="219" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$0</text>

      <!-- Five Bar Columns -->
      <!-- Bar 1: Direct Search ($440k) -->
      <rect x="140" y="95" width="80" height="120" rx="6" fill="url(#cyanGrad)"/>
      <text x="180" y="85" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle">$440k</text>
      <text x="180" y="235" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Direct</text>

      <!-- Bar 2: Organic Search ($360k) -->
      <rect x="290" y="117" width="80" height="98" rx="6" fill="url(#purpleGrad)"/>
      <text x="330" y="107" fill="#C084FC" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle">$360k</text>
      <text x="330" y="235" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Organic</text>

      <!-- Bar 3: Email Campaigns ($290k) -->
      <rect x="440" y="136" width="80" height="79" rx="6" fill="url(#emeraldGrad)"/>
      <text x="480" y="126" fill="#34D399" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle">$290k</text>
      <text x="480" y="235" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Email</text>

      <!-- Bar 4: Social Media ($220k) -->
      <rect x="590" y="155" width="80" height="60" rx="6" fill="url(#amberGrad)"/>
      <text x="630" y="145" fill="#FBBF24" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle">$220k</text>
      <text x="630" y="235" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Social</text>

      <!-- Bar 5: Paid Ads ($170k) -->
      <rect x="740" y="169" width="80" height="46" rx="6" fill="#3B82F6"/>
      <text x="780" y="159" fill="#60A5FA" font-family="ui-monospace, monospace" font-size="11" font-weight="700" text-anchor="middle">$170k</text>
      <text x="780" y="235" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">Paid Ads</text>
    </g>

    <!-- Chat Prompt Input Bar at Bottom -->
    <g transform="translate(32, 502)">
      <rect x="0" y="0" width="936" height="44" rx="10" fill="#0A1526" stroke="#1E2E48"/>
      <text x="20" y="27" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Ask a follow-up inquiry (e.g. "Calculate month-over-month percentage growth rates")...</text>
      <rect x="830" y="7" width="90" height="30" rx="6" fill="#0284C7"/>
      <text x="875" y="26" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Send ↵</text>
    </g>
  </g>
</svg>
`;

// 2. ALZHEIMER'S DETECTION SYSTEM (MRI scan viewer UI mockup with confidence bars)
const alzheimersSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  ${commonDefs}

  <defs>
    <radialGradient id="mriHeatmap1" cx="42%" cy="48%" r="35%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#F59E0B" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#3B82F6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mriHeatmap2" cx="62%" cy="48%" r="35%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#F59E0B" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#3B82F6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1280" height="720" fill="url(#bgGrad)"/>
  <rect width="1280" height="720" fill="url(#dotPattern)"/>
  <rect width="1280" height="720" fill="url(#centerGlowCyan)"/>

  <!-- Subtle Medical Grid lines -->
  <g stroke="#1E293B" stroke-width="1" opacity="0.25">
    <line x1="0" y1="120" x2="1280" y2="120"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="160" y1="0" x2="160" y2="720"/>
    <line x1="1120" y1="0" x2="1120" y2="720"/>
  </g>

  <!-- TOP-LEFT PILL BADGE -->
  <g transform="translate(56, 36)">
    <rect x="0" y="0" width="310" height="38" rx="19" fill="#0E1E38" stroke="#06B6D4" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#06B6D4"/>
    <text x="36" y="24" fill="#F0F9FF" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1">VGG16 TRANSFER LEARNING</text>
  </g>

  <!-- TOP-RIGHT STAT BADGE -->
  <g transform="translate(850, 36)">
    <rect x="0" y="0" width="374" height="38" rx="19" fill="#0E1E38" stroke="#34D399" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#34D399"/>
    <text x="36" y="24" fill="#6EE7B7" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="0.5">97.89% DIAGNOSTIC ACCURACY</text>
    <text x="280" y="24" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">• 4-Class</text>
  </g>

  <!-- CENTERED UI MOCKUP WINDOW -->
  <g transform="translate(140, 96)" filter="url(#windowShadow)">
    <rect x="0" y="0" width="1000" height="570" rx="18" fill="url(#windowBg)" stroke="#1E3252" stroke-width="1.5"/>

    <!-- Window Top Header Bar -->
    <rect x="0" y="0" width="1000" height="46" rx="18" fill="#11233E"/>
    <circle cx="26" cy="23" r="5.5" fill="#EF4444"/>
    <circle cx="44" cy="23" r="5.5" fill="#F59E0B"/>
    <circle cx="62" cy="23" r="5.5" fill="#10B981"/>
    <text x="96" y="28" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12">NeuroScan MRI Workstation // Axial T1 Classifier</text>
    
    <rect x="830" y="10" width="146" height="26" rx="6" fill="#0284C7" fill-opacity="0.15" stroke="#0284C7"/>
    <circle cx="846" cy="23" r="3.5" fill="#38BDF8"/>
    <text x="858" y="27" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">INFERENCE: 180ms</text>

    <!-- Main Workspace (2-Column Grid) -->
    <!-- LEFT PANEL: MRI Scan Viewer (Width: 460, Height: 480) -->
    <g transform="translate(32, 66)">
      <rect x="0" y="0" width="460" height="480" rx="14" fill="#060E1C" stroke="#1B2D49" stroke-width="1.2"/>
      
      <!-- Top info bar in viewer -->
      <text x="18" y="28" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="11" font-weight="700">SCAN: AXIAL_BRAIN_T1.DCM</text>
      <text x="360" y="28" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="10">SLICE: 54/112</text>

      <!-- MRI Image Frame -->
      <g transform="translate(45, 50)">
        <rect x="0" y="0" width="370" height="360" rx="12" fill="#030710" stroke="#16263D"/>
        
        <!-- Scan Crosshair lines -->
        <line x1="185" y1="10" x2="185" y2="350" stroke="#0284C7" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
        <line x1="10" y1="180" x2="360" y2="180" stroke="#0284C7" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>

        <!-- Stylized Brain Slice Anatomy -->
        <!-- Outer Skull Contour -->
        <ellipse cx="185" cy="180" rx="150" ry="160" fill="#0A162A" stroke="#334155" stroke-width="2"/>
        <ellipse cx="185" cy="180" rx="138" ry="148" fill="#0F223D" stroke="#1E293B" stroke-width="1.5"/>

        <!-- Left Hemisphere Cortical Folds -->
        <path d="M 178 50 C 130 55 70 95 65 180 C 65 255 125 300 178 310 Z" fill="#142B4E" stroke="#38BDF8" stroke-width="1.2" opacity="0.8"/>
        <!-- Right Hemisphere Cortical Folds -->
        <path d="M 192 50 C 240 55 300 95 305 180 C 305 255 245 300 192 310 Z" fill="#142B4E" stroke="#38BDF8" stroke-width="1.2" opacity="0.8"/>

        <!-- Ventricles -->
        <path d="M 175 140 C 150 160 150 200 175 220 Z" fill="#050B14"/>
        <path d="M 195 140 C 220 160 220 200 195 220 Z" fill="#050B14"/>

        <!-- Grad-CAM Activation Heatmaps (Hotspots on Temporal / Hippocampal Regions) -->
        <circle cx="135" cy="190" r="45" fill="url(#mriHeatmap1)" filter="blur(8px)"/>
        <circle cx="235" cy="190" r="45" fill="url(#mriHeatmap2)" filter="blur(8px)"/>

        <!-- Focal Pointer Badge -->
        <rect x="195" y="105" width="150" height="28" rx="6" fill="#0F172A" fill-opacity="0.9" stroke="#06B6D4"/>
        <text x="210" y="123" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="10" font-weight="700">GRAD-CAM ATTENTION</text>
      </g>

      <!-- Bottom viewer specs -->
      <text x="18" y="445" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">FOV: 240mm • Matrix: 224×224 • Contrast: Normalized</text>
      <text x="360" y="445" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="600">● REAL-TIME</text>
    </g>

    <!-- RIGHT PANEL: 4-Class Confidence Meters & Diagnosis (Width: 460, Height: 480) -->
    <g transform="translate(508, 66)">
      <rect x="0" y="0" width="460" height="480" rx="14" fill="#0A1526" stroke="#1B2D49" stroke-width="1.2"/>

      <!-- Primary Diagnostic Decision Card -->
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="420" height="85" rx="10" fill="#0D233A" stroke="#10B981" stroke-width="1.5"/>
        <text x="20" y="30" fill="#6EE7B7" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">PRIMARY CLASSIFICATION RESULT</text>
        <text x="20" y="62" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="24" font-weight="800">Non-Demented (Healthy)</text>
        <rect x="310" y="24" width="90" height="36" rx="8" fill="#10B981"/>
        <text x="355" y="47" fill="#FFFFFF" font-family="ui-monospace, monospace" font-size="15" font-weight="800" text-anchor="middle">97.89%</text>
      </g>

      <!-- 4-Class Probability Distribution Header -->
      <text x="20" y="136" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="13" font-weight="700">Multi-Class Probability Distribution</text>
      <text x="20" y="152" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Softmax confidence outputs across all 4 stages</text>

      <!-- Probability Bar 1: Non-Demented (97.89%) -->
      <g transform="translate(20, 172)">
        <text x="0" y="14" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Non-Demented</text>
        <text x="420" y="14" fill="#34D399" font-family="ui-monospace, monospace" font-size="12" font-weight="700" text-anchor="end">97.89%</text>
        <rect x="0" y="22" width="420" height="12" rx="6" fill="#1E293B"/>
        <rect x="0" y="22" width="411" height="12" rx="6" fill="url(#emeraldGrad)"/>
      </g>

      <!-- Probability Bar 2: Very Mild Demented (1.42%) -->
      <g transform="translate(20, 226)">
        <text x="0" y="14" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Very Mild Demented</text>
        <text x="420" y="14" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12" font-weight="600" text-anchor="end">1.42%</text>
        <rect x="0" y="22" width="420" height="12" rx="6" fill="#1E293B"/>
        <rect x="0" y="22" width="22" height="12" rx="6" fill="#38BDF8"/>
      </g>

      <!-- Probability Bar 3: Mild Demented (0.48%) -->
      <g transform="translate(20, 280)">
        <text x="0" y="14" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Mild Demented</text>
        <text x="420" y="14" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12" font-weight="600" text-anchor="end">0.48%</text>
        <rect x="0" y="22" width="420" height="12" rx="6" fill="#1E293B"/>
        <rect x="0" y="22" width="12" height="12" rx="6" fill="#F59E0B"/>
      </g>

      <!-- Probability Bar 4: Moderate Demented (0.21%) -->
      <g transform="translate(20, 334)">
        <text x="0" y="14" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12" font-weight="500">Moderate Demented</text>
        <text x="420" y="14" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12" font-weight="600" text-anchor="end">0.21%</text>
        <rect x="0" y="22" width="420" height="12" rx="6" fill="#1E293B"/>
        <rect x="0" y="22" width="8" height="12" rx="6" fill="#EF4444"/>
      </g>

      <!-- Model Training & Architecture Spec Box -->
      <g transform="translate(20, 396)">
        <rect x="0" y="0" width="420" height="66" rx="8" fill="#060E1A" stroke="#16263D"/>
        <text x="14" y="22" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="10" font-weight="700">ARCHITECTURE SPECIFICATIONS:</text>
        <text x="14" y="42" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="11">VGG16 Pretrained Backbone • 2-Phase Training</text>
        <text x="14" y="56" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10">Class Weight Balanced • Data Augmentation Pipeline</text>
      </g>
    </g>
  </g>
</svg>
`;

// 3. WALMART SALES FORECASTING (sales trend dashboard mockup with a forecast chart)
const walmartSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  ${commonDefs}

  <defs>
    <linearGradient id="forecastAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="holidayAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="720" fill="url(#bgGrad)"/>
  <rect width="1280" height="720" fill="url(#dotPattern)"/>
  <rect width="1280" height="720" fill="url(#centerGlowAmber)"/>

  <!-- Grid lines -->
  <g stroke="#1E293B" stroke-width="1" opacity="0.25">
    <line x1="0" y1="120" x2="1280" y2="120"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="160" y1="0" x2="160" y2="720"/>
    <line x1="1120" y1="0" x2="1120" y2="720"/>
  </g>

  <!-- TOP-LEFT PILL BADGE -->
  <g transform="translate(56, 36)">
    <rect x="0" y="0" width="315" height="38" rx="19" fill="#0E1E38" stroke="#F59E0B" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#F59E0B"/>
    <text x="36" y="24" fill="#FEF3C7" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1">RANDOM FOREST REGRESSION</text>
  </g>

  <!-- TOP-RIGHT STAT BADGE -->
  <g transform="translate(850, 36)">
    <rect x="0" y="0" width="374" height="38" rx="19" fill="#0E1E38" stroke="#38BDF8" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#38BDF8"/>
    <text x="36" y="24" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="0.5">R² = 0.93 ACCURACY SCORE</text>
    <text x="260" y="24" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">• 12-Wk Forecast</text>
  </g>

  <!-- CENTERED UI MOCKUP WINDOW -->
  <g transform="translate(140, 96)" filter="url(#windowShadow)">
    <rect x="0" y="0" width="1000" height="570" rx="18" fill="url(#windowBg)" stroke="#1E3252" stroke-width="1.5"/>

    <!-- Window Top Header Bar -->
    <rect x="0" y="0" width="1000" height="46" rx="18" fill="#11233E"/>
    <circle cx="26" cy="23" r="5.5" fill="#EF4444"/>
    <circle cx="44" cy="23" r="5.5" fill="#F59E0B"/>
    <circle cx="62" cy="23" r="5.5" fill="#10B981"/>
    <text x="96" y="28" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12">walmart-demand-forecast // multi-store-forecasting.py</text>
    
    <rect x="830" y="10" width="146" height="26" rx="6" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B"/>
    <circle cx="846" cy="23" r="3.5" fill="#FBBF24"/>
    <text x="858" y="27" fill="#FBBF24" font-family="system-ui, sans-serif" font-size="11" font-weight="700">45 RETAIL STORES</text>

    <!-- Top KPI Mini-Cards Row -->
    <g transform="translate(32, 60)">
      <!-- KPI 1 -->
      <rect x="0" y="0" width="220" height="66" rx="10" fill="#0A1526" stroke="#1B2E4B"/>
      <text x="16" y="22" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">TOTAL HISTORICAL RECORDS</text>
      <text x="16" y="48" fill="#F8FAFC" font-family="ui-monospace, monospace" font-size="20" font-weight="800">6,435 Data Rows</text>

      <!-- KPI 2 -->
      <rect x="238" y="0" width="220" height="66" rx="10" fill="#0A1526" stroke="#1B2E4B"/>
      <text x="16" y="22" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">FORECAST HORIZON</text>
      <text x="16" y="48" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="20" font-weight="800">12 Weeks Ahead</text>

      <!-- KPI 3 -->
      <rect x="476" y="0" width="220" height="66" rx="10" fill="#0A1526" stroke="#1B2E4B"/>
      <text x="16" y="22" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">EXPLAINED VARIANCE (R²)</text>
      <text x="16" y="48" fill="#34D399" font-family="ui-monospace, monospace" font-size="20" font-weight="800">0.93 (93.0%)</text>

      <!-- KPI 4 -->
      <rect x="714" y="0" width="222" height="66" rx="10" fill="#0A1526" stroke="#1B2E4B"/>
      <text x="16" y="22" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">HOLIDAY SPIKE IMPACT</text>
      <text x="16" y="48" fill="#FBBF24" font-family="ui-monospace, monospace" font-size="20" font-weight="800">+42.8% Demand</text>
    </g>

    <!-- Main Forecast Chart Card -->
    <g transform="translate(32, 140)">
      <rect x="0" y="0" width="936" height="340" rx="14" fill="#071222" stroke="#1E3252" stroke-width="1.2"/>
      
      <!-- Chart Top Bar with Legends -->
      <text x="24" y="32" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Weekly Department Sales Actuals vs. 12-Week Forecast Horizon</text>
      
      <!-- Legends -->
      <g transform="translate(560, 20)">
        <line x1="0" y1="10" x2="24" y2="10" stroke="#64748B" stroke-width="2.5"/>
        <text x="32" y="14" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">Actual Sales</text>

        <line x1="120" y1="10" x2="144" y2="10" stroke="#38BDF8" stroke-width="3"/>
        <text x="152" y="14" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="600">RF Model</text>

        <line x1="230" y1="10" x2="254" y2="10" stroke="#F59E0B" stroke-width="3" stroke-dasharray="5,3"/>
        <text x="262" y="14" fill="#FBBF24" font-family="system-ui, sans-serif" font-size="11" font-weight="700">12-Wk Forecast</text>
      </g>

      <!-- Chart Grid -->
      <g stroke="#1A2D48" stroke-width="1" stroke-dasharray="3,3">
        <line x1="80" y1="70" x2="890" y2="70"/>
        <line x1="80" y1="130" x2="890" y2="130"/>
        <line x1="80" y1="190" x2="890" y2="190"/>
        <line x1="80" y1="250" x2="890" y2="250"/>
      </g>

      <!-- Y-Axis Labels -->
      <text x="68" y="74" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$2.4M</text>
      <text x="68" y="134" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$2.0M</text>
      <text x="68" y="194" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$1.6M</text>
      <text x="68" y="254" fill="#64748B" font-family="ui-monospace, monospace" font-size="10" text-anchor="end">$1.2M</text>

      <!-- Shaded forecast area -->
      <polygon points="560,195 620,170 680,140 740,180 800,85 860,110 860,280 560,280" fill="url(#holidayAreaGrad)"/>
      <polygon points="100,220 160,200 220,230 280,180 340,160 400,190 460,170 520,210 560,195 560,280 100,280" fill="url(#forecastAreaGrad)"/>

      <!-- Historical Actual Polyline -->
      <polyline points="100,225 160,205 220,234 280,185 340,164 400,192 460,168 520,214 560,195" fill="none" stroke="#64748B" stroke-width="2"/>

      <!-- Random Forest Fitted Curve -->
      <polyline points="100,220 160,200 220,230 280,180 340,160 400,190 460,170 520,210 560,195" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>

      <!-- Forecast 12-Week Projection with Holiday Spike -->
      <polyline points="560,195 620,170 680,140 740,180 800,85 860,110" fill="none" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6,4"/>

      <!-- Holiday Surge Callout Box -->
      <g transform="translate(680, 42)">
        <rect x="0" y="0" width="200" height="34" rx="8" fill="#1E1906" stroke="#F59E0B" stroke-width="1.2"/>
        <circle cx="16" cy="17" r="4" fill="#FBBF24"/>
        <text x="28" y="22" fill="#FEF3C7" font-family="system-ui, sans-serif" font-size="11" font-weight="700">★ THANKSGIVING PEAK</text>
      </g>

      <!-- Forecast Data Points -->
      <circle cx="560" cy="195" r="5" fill="#38BDF8"/>
      <circle cx="680" cy="140" r="5" fill="#F59E0B"/>
      <circle cx="800" cy="85" r="6" fill="#FBBF24"/>

      <!-- X-Axis Timeline Markers -->
      <g fill="#94A3B8" font-family="ui-monospace, monospace" font-size="10" text-anchor="middle">
        <text x="100" y="295">Wk 01</text>
        <text x="220" y="295">Wk 10</text>
        <text x="340" y="295">Wk 20</text>
        <text x="460" y="295">Wk 30</text>
        <text x="560" y="295" fill="#38BDF8" font-weight="700">Today</text>
        <text x="680" y="295" fill="#F59E0B">Forecast +6</text>
        <text x="800" y="295" fill="#FBBF24" font-weight="700">Holiday +10</text>
        <text x="860" y="295" fill="#F59E0B">+12 Wks</text>
      </g>
    </g>

    <!-- Bottom Feature Explanations Pill Row -->
    <g transform="translate(32, 496)">
      <rect x="0" y="0" width="936" height="50" rx="10" fill="#0A1526" stroke="#1E2E48"/>
      <text x="20" y="30" fill="#38BDF8" font-family="ui-monospace, monospace" font-size="11" font-weight="700">KEY REGRESSION FEATURES:</text>
      <text x="220" y="30" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="12">Holiday Markdowns • CPI Inflation Index • Unemployment Rate • Seasonal Temperatures</text>
    </g>
  </g>
</svg>
`;

// 4. VERIDOC AI (document RAG chat interface mockup with cited sources)
const veridocSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  ${commonDefs}

  <rect width="1280" height="720" fill="url(#bgGrad)"/>
  <rect width="1280" height="720" fill="url(#dotPattern)"/>
  <rect width="1280" height="720" fill="url(#centerGlowCyan)"/>

  <!-- Grid lines -->
  <g stroke="#1E293B" stroke-width="1" opacity="0.25">
    <line x1="0" y1="120" x2="1280" y2="120"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="160" y1="0" x2="160" y2="720"/>
    <line x1="1120" y1="0" x2="1120" y2="720"/>
  </g>

  <!-- TOP-LEFT PILL BADGE -->
  <g transform="translate(56, 36)">
    <rect x="0" y="0" width="310" height="38" rx="19" fill="#0E1E38" stroke="#06B6D4" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#06B6D4"/>
    <text x="36" y="24" fill="#F0F9FF" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1">HYBRID RAG (BM25 + DENSE)</text>
  </g>

  <!-- TOP-RIGHT STAT BADGE -->
  <g transform="translate(850, 36)">
    <rect x="0" y="0" width="374" height="38" rx="19" fill="#0E1E38" stroke="#8B5CF6" stroke-width="1.5" opacity="0.95"/>
    <circle cx="20" cy="19" r="5" fill="#8B5CF6"/>
    <text x="36" y="24" fill="#C084FC" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="0.5">PAGE-LEVEL CITATIONS</text>
    <text x="236" y="24" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">• Zero Hallucination</text>
  </g>

  <!-- CENTERED UI MOCKUP WINDOW -->
  <g transform="translate(140, 96)" filter="url(#windowShadow)">
    <rect x="0" y="0" width="1000" height="570" rx="18" fill="url(#windowBg)" stroke="#1E3252" stroke-width="1.5"/>

    <!-- Window Top Header Bar -->
    <rect x="0" y="0" width="1000" height="46" rx="18" fill="#11233E"/>
    <circle cx="26" cy="23" r="5.5" fill="#EF4444"/>
    <circle cx="44" cy="23" r="5.5" fill="#F59E0B"/>
    <circle cx="62" cy="23" r="5.5" fill="#10B981"/>
    <text x="96" y="28" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12">veridoc-ai // multi-doc-knowledge-assistant</text>
    
    <rect x="820" y="10" width="156" height="26" rx="6" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4"/>
    <circle cx="836" cy="23" r="3.5" fill="#38BDF8"/>
    <text x="848" y="27" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">GROQ INFERENCE: 410ms</text>

    <!-- Attached Knowledge Files Toolbar -->
    <g transform="translate(32, 60)">
      <rect x="0" y="0" width="936" height="40" rx="8" fill="#0A1526" stroke="#1B2D49"/>
      <text x="16" y="25" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="11" font-weight="700">INDEXED DOCUMENTS:</text>

      <!-- Pill 1: Active PDF -->
      <rect x="170" y="6" width="220" height="28" rx="6" fill="#0E233E" stroke="#0284C7"/>
      <text x="184" y="24" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="600">📄 Financial_Report_2024.pdf (48 pgs)</text>

      <!-- Pill 2: Word doc -->
      <rect x="405" y="6" width="190" height="28" rx="6" fill="#152136" stroke="#334155"/>
      <text x="419" y="24" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">📄 Q3_Executive_Brief.docx</text>

      <!-- Pill 3: Slides -->
      <rect x="610" y="6" width="180" height="28" rx="6" fill="#152136" stroke="#334155"/>
      <text x="624" y="24" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11">📄 Investor_Deck.pptx</text>
    </g>

    <!-- Chat Query Bubble -->
    <g transform="translate(32, 115)">
      <rect x="0" y="0" width="936" height="52" rx="10" fill="#152744" stroke="#0284C7" stroke-width="1.2"/>
      <rect x="14" y="14" width="60" height="24" rx="6" fill="#0284C7" fill-opacity="0.3"/>
      <text x="24" y="30" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">USER</text>
      <text x="86" y="31" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="500">"What are our operating margins in Q3 and what primary drivers contributed to growth?"</text>
    </g>

    <!-- Retrieved Ground Truth Chunk with Exact Page Citation -->
    <g transform="translate(32, 182)">
      <rect x="0" y="0" width="936" height="116" rx="12" fill="#091526" stroke="#06B6D4" stroke-width="1.2"/>
      
      <!-- Badges on retrieved chunk -->
      <rect x="18" y="14" width="180" height="24" rx="6" fill="#06B6D4" fill-opacity="0.2" stroke="#06B6D4"/>
      <text x="28" y="30" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">SOURCE: PAGE 14 • CITATION #1</text>

      <rect x="210" y="14" width="140" height="24" rx="6" fill="#8B5CF6" fill-opacity="0.2" stroke="#8B5CF6"/>
      <text x="220" y="30" fill="#C084FC" font-family="system-ui, sans-serif" font-size="11" font-weight="700">SIMILARITY: 99.4%</text>

      <rect x="362" y="14" width="150" height="24" rx="6" fill="#10B981" fill-opacity="0.2" stroke="#10B981"/>
      <text x="372" y="30" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="700">HYBRID RETRIEVAL (BM25)</text>

      <!-- Extracted Text Quote with highlight -->
      <text x="18" y="66" fill="#F1F5F9" font-family="system-ui, sans-serif" font-size="13" font-weight="600">
        "...Operating margin expanded by 320 basis points year-over-year to 28.4% in the third quarter..."
      </text>
      <text x="18" y="94" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">
        Drivers cited: automated logistics sorting and reduced cloud compute overhead across enterprise clusters.
      </text>
    </g>

    <!-- Synthesized LLM Answer with Grounding Verification -->
    <g transform="translate(32, 314)">
      <rect x="0" y="0" width="936" height="175" rx="12" fill="#0C1B32" stroke="#1E3252" stroke-width="1.2"/>
      
      <!-- AI Model Badge -->
      <rect x="18" y="16" width="140" height="26" rx="6" fill="#0284C7" fill-opacity="0.2" stroke="#0284C7"/>
      <circle cx="32" cy="29" r="4" fill="#38BDF8"/>
      <text x="44" y="33" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">VERIDOC ASSISTANT</text>

      <rect x="170" y="16" width="160" height="26" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981"/>
      <circle cx="184" cy="29" r="3.5" fill="#34D399"/>
      <text x="196" y="33" fill="#34D399" font-family="system-ui, sans-serif" font-size="11" font-weight="700">STRICT FACTUAL CHECK: PASS</text>

      <!-- Synthesized answer body -->
      <text x="18" y="72" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="600">
        Based strictly on <tspan fill="#38BDF8" text-decoration="underline">Financial_Report_2024.pdf [Page 14]</tspan>, here are the confirmed metrics:
      </text>
      
      <g transform="translate(18, 90)">
        <circle cx="8" cy="8" r="3" fill="#38BDF8"/>
        <text x="20" y="12" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">
          <tspan font-weight="700" fill="#FFFFFF">Q3 Operating Margin:</tspan> Reached 28.4%, marking a +3.2% (320 bps) YoY expansion.
        </text>

        <circle cx="8" cy="32" r="3" fill="#38BDF8"/>
        <text x="20" y="36" fill="#E2E8F0" font-family="system-ui, sans-serif" font-size="12">
          <tspan font-weight="700" fill="#FFFFFF">Primary Drivers:</tspan> Automated logistics sorting algorithms and targeted cloud compute cost optimizations.
        </text>

        <circle cx="8" cy="56" r="3" fill="#38BDF8"/>
        <text x="20" y="60" fill="#6EE7B7" font-family="system-ui, sans-serif" font-size="12">
          <tspan font-weight="700">Hallucination Safeguard:</tspan> 100% of answer assertions are mapped to source document tokens.
        </text>
      </g>
    </g>

    <!-- Bottom Query Bar -->
    <g transform="translate(32, 504)">
      <rect x="0" y="0" width="936" height="44" rx="10" fill="#0A1526" stroke="#1E2E48"/>
      <text x="20" y="27" fill="#64748B" font-family="system-ui, sans-serif" font-size="12">Ask another question across your 3 indexed documents...</text>
      <rect x="830" y="7" width="90" height="30" rx="6" fill="#8B5CF6"/>
      <text x="875" y="26" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Query ↵</text>
    </g>
  </g>
</svg>
`;

async function generateAll() {
  const configs = [
    { svg: dataWhispererSvg, name: 'data-whisperer-banner.png' },
    { svg: alzheimersSvg, name: 'alzheimers-banner.png' },
    { svg: walmartSvg, name: 'walmart-banner.png' },
    { svg: veridocSvg, name: 'veridoc-banner.png' }
  ];

  for (const item of configs) {
    const dest = path.join(outputDir, item.name);
    console.log(`Generating ${item.name} at 1280x720 (16:9 native)...`);
    await sharp(Buffer.from(item.svg))
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(dest);
    const stats = fs.statSync(dest);
    console.log(`Successfully generated ${dest} (${stats.size} bytes)`);
  }
  console.log('All 4 native 16:9 banners generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating banners:', err);
  process.exit(1);
});
