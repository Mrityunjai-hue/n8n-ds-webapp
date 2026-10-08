'use client';

import { useState, useEffect, useRef, useCallback } from "react";

// Initialize window.storage fallback if not present
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    list: async (prefix) => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keys.push(key);
        }
      }
      return { keys };
    },
    get: async (key) => {
      return { value: localStorage.getItem(key) };
    },
    set: async (key, val) => {
      localStorage.setItem(key, val);
    },
    delete: async (key) => {
      localStorage.removeItem(key);
    }
  };
}

/* ═══════════════════════════════════════════════════════
   CONSTANTS & DEFAULTS
═══════════════════════════════════════════════════════ */
const uid = () => Math.random().toString(36).slice(2, 8);

const BLOCK_TYPES = {
  features:  { label: "Feature List",    icon: "⚡" },
  stats:     { label: "Stats Row",        icon: "📊" },
  cta:       { label: "Call to Action",   icon: "→"  },
  callout:   { label: "Callout Box",      icon: "💡" },
  info:      { label: "Info Table",       icon: "📋" },
  text:      { label: "Text Block",       icon: "¶"  },
  checklist: { label: "Checklist",        icon: "✓"  },
  quote:     { label: "Pull Quote",       icon: "❝"  },
  image:     { label: "Image",            icon: "🖼"  },
  divider:   { label: "Divider",          icon: "—"  },
  socials:   { label: "Social Links",     icon: "🔗" },
  spacer:    { label: "Spacer",           icon: "↕"  },
};

const BLOCK_DEFAULTS = {
  features:  { sectionLabel: "// What we offer", items: [{ icon: "🚀", title: "Feature Title", desc: "Describe this point clearly and concisely." }] },
  stats:     { items: [{ num: "200+", label: "Participants" }, { num: "20+", label: "Colleges" }, { num: "30+", label: "Projects" }] },
  cta:       { text: "Join Now →", link: "", sub: "Free · Open to all branches", style: "solid", align: "center" },
  callout:   { text: "Key highlight or important note for your readers.", style: "indigo" },
  info:      { title: "// Details", rows: [{ key: "Date", val: "" }, { key: "Time", val: "" }, { key: "Link", val: "" }] },
  text:      { content: "Write your paragraph text here. Use this block for any standalone message, update, or announcement body.", align: "left", size: "md" },
  checklist: { title: "What to expect", items: [{ text: "First item" }, { text: "Second item" }, { text: "Third item" }] },
  quote:     { text: "Learning by building is the only way that truly sticks.", author: "— N8N Community" },
  image:     { url: "", alt: "", caption: "", rounded: true },
  divider:   { style: "gradient" },
  socials:   { links: [{ platform: "LinkedIn", url: "", icon: "in" }, { platform: "GitHub", url: "", icon: "gh" }, { platform: "Instagram", url: "", icon: "ig" }] },
  spacer:    { height: 24 },
};

const PRESETS = {
  session: {
    label: "📅 Session", badge: "✦ HBTU Kanpur · Upcoming Session",
    title: "Python & Machine Learning", titleAccent: "Session This Sunday",
    body: "Join us for an interactive hands-on session where we'll build your first ML model from scratch. No prior experience needed — just bring curiosity and your laptop.",
    blocks: [
      { id: uid(), type: "features", visible: true, ...BLOCK_DEFAULTS.features, sectionLabel: "// What we'll cover", items: [{ icon: "🐍", title: "Python Foundations", desc: "Variables, loops, functions — everything to get you started writing real code." }, { icon: "🤖", title: "Intro to Machine Learning", desc: "Understand how ML works with a live demo on real data." }, { icon: "💻", title: "Hands-on Coding", desc: "You'll write and run code during the session." }] },
      { id: uid(), type: "stats", visible: true, ...BLOCK_DEFAULTS.stats },
      { id: uid(), type: "cta", visible: true, text: "Join the Session →", link: "", sub: "Free · Open to all branches & years", style: "solid", align: "center" },
      { id: uid(), type: "info", visible: true, title: "// Session Details", rows: [{ key: "Date", val: "Fill in date" }, { key: "Time", val: "1:00 PM IST · Online" }, { key: "Topic", val: "Python & ML Fundamentals" }, { key: "Link", val: "Add Meet link" }] },
    ],
  },
  welcome: {
    label: "👋 Welcome", badge: "✦ Welcome to N8N",
    title: "You're Now Part of", titleAccent: "Something Big",
    body: "Welcome aboard! You've just joined one of HBTU's most active student communities. Here's everything to get you started.",
    blocks: [
      { id: uid(), type: "callout", visible: true, text: "🎉 You're officially a member of the N8N Data Science Community. We're glad to have you!", style: "indigo" },
      { id: uid(), type: "features", visible: true, sectionLabel: "// What's waiting for you", items: [{ icon: "🚀", title: "Learning Paths", desc: "Curated Python & ML roadmaps from day one." }, { icon: "🏆", title: "Hackathons", desc: "Compete in HackNova and future events we host." }, { icon: "🤝", title: "Community", desc: "Connect with peers who share your drive." }] },
      { id: uid(), type: "stats", visible: true, ...BLOCK_DEFAULTS.stats },
      { id: uid(), type: "checklist", visible: true, title: "Get started in 3 steps", items: [{ text: "Join our WhatsApp group" }, { text: "Follow us on LinkedIn" }, { text: "Attend the next session" }] },
      { id: uid(), type: "cta", visible: true, text: "Explore the Community →", link: "", sub: "We're glad to have you", style: "solid", align: "center" },
    ],
  },
  hackathon: {
    label: "⚡ Hackathon", badge: "⚡ HackNova · Registration Open",
    title: "The Biggest Student", titleAccent: "Hackathon is Back",
    body: "HackNova is returning with bigger prizes, more colleges, and harder challenges. Form your team and build something the world hasn't seen yet.",
    blocks: [
      { id: uid(), type: "stats", visible: true, items: [{ num: "200+", label: "Last Edition" }, { num: "20+", label: "Colleges" }, { num: "3", label: "Tracks" }] },
      { id: uid(), type: "features", visible: true, sectionLabel: "// Choose your track", items: [{ icon: "🧠", title: "ML & AI", desc: "Build intelligent systems using real datasets." }, { icon: "🌐", title: "Web Development", desc: "Create functional web products in 24 hours." }, { icon: "📊", title: "Data Analytics", desc: "Turn raw data into insights and stories." }] },
      { id: uid(), type: "callout", visible: true, text: "⏰ Early registrations get exclusive swag and priority team-matching support.", style: "cyan" },
      { id: uid(), type: "cta", visible: true, text: "Register Now →", link: "", sub: "Seats are limited · Register before they fill", style: "solid", align: "center" },
      { id: uid(), type: "info", visible: true, title: "// Event Details", rows: [{ key: "Date", val: "TBD · 2026" }, { key: "Mode", val: "Hybrid · Online + HBTU Campus" }, { key: "Prize", val: "Certs + Goodies + Recognition" }] },
    ],
  },
  announcement: {
    label: "📢 Announcement", badge: "📢 Community Update",
    title: "Exciting News from", titleAccent: "N8N",
    body: "We have an important announcement to share with the community. Read on for all the details.",
    blocks: [
      { id: uid(), type: "text", visible: true, content: "Write your full announcement here. Share what's happening, why it matters, and what your readers should do next.", align: "left", size: "md" },
      { id: uid(), type: "callout", visible: true, text: "Add your key highlight or action item here.", style: "indigo" },
      { id: uid(), type: "cta", visible: true, text: "Learn More →", link: "", sub: "", style: "outline", align: "center" },
    ],
  },
  newsletter: {
    label: "📰 Newsletter", badge: "📰 Monthly Digest · N8N",
    title: "This Month in", titleAccent: "Data Science",
    body: "Here's a roundup of everything that happened in the N8N community this month — sessions, achievements, upcoming events, and more.",
    blocks: [
      { id: uid(), type: "text", visible: true, content: "📚 Sessions Recap\n\nThis month we hosted sessions on Python fundamentals and an intro to neural networks. Over 40 students attended live.", align: "left", size: "md" },
      { id: uid(), type: "divider", visible: true, style: "gradient" },
      { id: uid(), type: "text", visible: true, content: "🏆 Achievements\n\nCongratulations to our members who completed the Databricks Generative AI certification this month!", align: "left", size: "md" },
      { id: uid(), type: "stats", visible: true, items: [{ num: "3", label: "Sessions" }, { num: "40+", label: "Attendees" }, { num: "5", label: "Certifications" }] },
      { id: uid(), type: "cta", visible: true, text: "View All Updates →", link: "", sub: "", style: "ghost", align: "center" },
    ],
  },
  custom: {
    label: "✏️ Custom", badge: "✦ N8N Data Science Community",
    title: "Your Email", titleAccent: "Title Here",
    body: "Write your main message here. This is the opening body of your email — make it clear, engaging, and personal.",
    blocks: [
      { id: uid(), type: "cta", visible: true, ...BLOCK_DEFAULTS.cta },
    ],
  },
};

/* ═══════════════════════════════════════════════════════
   HTML EXPORT ENGINE
═══════════════════════════════════════════════════════ */
const gradCSS = `background:linear-gradient(90deg,#818cf8,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;

function blockToHTML(block, theme) {
  const ac1 = theme.ac1 || "#4f46e5";
  const ac2 = theme.ac2 || "#0891b2";
  if (!block.visible) return "";
  switch (block.type) {
    case "features": return `
      <tr><td style="padding:24px 36px 8px;">
        ${block.sectionLabel ? `<p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(6,182,212,.7);font-family:monospace;">${block.sectionLabel}</p>` : ""}
        ${(block.items||[]).map(f=>`
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
          <td width="46" valign="top"><div style="width:36px;height:36px;background:linear-gradient(135deg,rgba(99,102,241,.14),rgba(6,182,212,.07));border:1px solid rgba(99,102,241,.2);border-radius:8px;text-align:center;line-height:36px;font-size:17px;">${f.icon}</div></td>
          <td valign="top" style="padding-left:12px;"><p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#e2e8f0;">${f.title}</p><p style="margin:0;font-size:12px;color:#64748b;line-height:1.55;">${f.desc}</p></td>
        </tr></table>`).join("")}
      </td></tr>`;
    case "stats": return `
      <tr><td style="padding:8px 36px 24px;">
        <table width="100%" style="background:rgba(13,13,26,.95);border:1px solid rgba(99,102,241,.11);border-radius:10px;"><tr>
          ${(block.items||[]).map((s,i)=>`<td width="${Math.floor(100/(block.items.length))}%" style="text-align:center;padding:18px 0;${i>0?"border-left:1px solid rgba(99,102,241,.1);":""}"><p style="margin:0 0 4px;font-size:22px;font-weight:800;font-family:monospace;${gradCSS}">${s.num}</p><p style="margin:0;font-size:9px;color:#475569;letter-spacing:.1em;text-transform:uppercase;font-weight:600;">${s.label}</p></td>`).join("")}
        </tr></table>
      </td></tr>`;
    case "cta": return `
      <tr><td style="padding:8px 36px 24px;text-align:${block.align||"center"};">
        <a href="${block.link||"#"}" style="display:inline-block;${block.style==="solid"?`background:linear-gradient(135deg,${ac1},${ac2});color:#fff;`:block.style==="outline"?`background:transparent;color:${ac1};border:2px solid ${ac1};`:`background:transparent;color:${ac1};`}text-decoration:none;font-size:14px;font-weight:700;letter-spacing:.04em;padding:13px 40px;border-radius:8px;${block.style==="solid"?"box-shadow:0 4px 20px rgba(79,70,229,.28);":""}">${block.text}</a>
        ${block.sub?`<p style="margin:10px 0 0;font-size:11px;color:#475569;font-weight:300;text-align:center;">${block.sub}</p>`:""}
      </td></tr>`;
    case "callout": return `
      <tr><td style="padding:0 36px 22px;">
        <div style="${block.style==="cyan"?"background:rgba(6,182,212,.06);border-left:3px solid #06b6d4;":"block.style==='warning'"?"background:rgba(245,158,11,.06);border-left:3px solid #f59e0b;":"background:rgba(99,102,241,.07);border-left:3px solid ${ac1};"}border-radius:0 8px 8px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.65;">${block.text}</p>
        </div>
      </td></tr>`;
    case "info": return `
      <tr><td style="padding:0 36px 26px;">
        <div style="background:rgba(6,182,212,.04);border:1px solid rgba(6,182,212,.1);border-radius:10px;padding:16px 18px;">
          ${block.title?`<p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#06b6d4;letter-spacing:.15em;text-transform:uppercase;font-family:monospace;">${block.title}</p>`:""}
          ${(block.rows||[]).map(r=>`<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:5px;"><tr><td width="80" valign="top" style="font-size:11px;color:#475569;font-weight:600;">${r.key}</td><td style="font-size:11px;color:#cbd5e1;font-weight:300;">${r.val}</td></tr></table>`).join("")}
        </div>
      </td></tr>`;
    case "text": return `
      <tr><td style="padding:0 36px 20px;text-align:${block.align||"left"};">
        <p style="margin:0;font-size:${block.size==="lg"?"16px":block.size==="sm"?"12px":"14px"};color:#94a3b8;line-height:1.8;font-weight:300;white-space:pre-line;">${block.content}</p>
      </td></tr>`;
    case "checklist": return `
      <tr><td style="padding:0 36px 22px;">
        ${block.title?`<p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#e2e8f0;">${block.title}</p>`:""}
        ${(block.items||[]).map(it=>`<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;"><div style="width:18px;height:18px;background:linear-gradient(135deg,${ac1},${ac2});border-radius:4px;flex-shrink:0;text-align:center;line-height:18px;font-size:11px;color:#fff;margin-top:1px;">✓</div><p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.5;">${it.text}</p></div>`).join("")}
      </td></tr>`;
    case "quote": return `
      <tr><td style="padding:0 36px 24px;">
        <div style="border:1px solid rgba(99,102,241,.18);border-radius:10px;padding:22px 24px;background:rgba(99,102,241,.04);text-align:center;">
          <p style="margin:0 0 12px;font-size:18px;color:rgba(99,102,241,.4);font-family:Georgia,serif;">"</p>
          <p style="margin:0 0 10px;font-size:15px;color:#cbd5e1;line-height:1.7;font-style:italic;">${block.text}</p>
          ${block.author?`<p style="margin:0;font-size:11px;color:#475569;font-weight:600;letter-spacing:.06em;">${block.author}</p>`:""}
        </div>
      </td></tr>`;
    case "image": return block.url ? `
      <tr><td style="padding:0 36px 22px;text-align:center;">
        <img src="${block.url}" alt="${block.alt||""}" style="max-width:100%;border-radius:${block.rounded?"10px":"4px"};border:1px solid rgba(99,102,241,.1);" />
        ${block.caption?`<p style="margin:8px 0 0;font-size:11px;color:#475569;font-style:italic;">${block.caption}</p>`:""}
      </td></tr>` : "";
    case "divider": return `
      <tr><td style="padding:8px 36px 8px;"><div style="${block.style==="dots"?"text-align:center;color:#1e293b;letter-spacing:.3em;font-size:14px;":block.style==="solid"?"height:1px;background:rgba(99,102,241,.12);":"height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,.25),rgba(6,182,212,.15),transparent);"}${block.style==="dots"?"":""}"></div>${block.style==="dots"?"<div style=\"text-align:center;color:#1e293b;letter-spacing:.3em;font-size:14px;padding:4px 0;\">· · ·</div>":""}</td></tr>`;
    case "socials": return `
      <tr><td style="padding:0 36px 22px;text-align:center;">
        ${(block.links||[]).filter(l=>l.url).map(l=>`<a href="${l.url}" style="display:inline-block;margin:0 6px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:6px;padding:7px 16px;font-size:11px;font-weight:700;color:#818cf8;text-decoration:none;letter-spacing:.06em;">${l.platform}</a>`).join("")}
      </td></tr>`;
    case "spacer": return `<tr><td style="height:${block.height||24}px;"></td></tr>`;
    default: return "";
  }
}

function buildHTML(state) {
  const { meta, hero, blocks, footer, theme } = state;
  const ac1 = theme.ac1||"#4f46e5", ac2 = theme.ac2||"#0891b2";
  const blocksHTML = (blocks||[]).map(b=>blockToHTML(b,theme)).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
${meta.previewText?`<span style="display:none;max-height:0;overflow:hidden;">${meta.previewText}</span>`:""}
<title>${meta.subject||"N8N Email"}</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:20px 0;background:#0a0a0f;font-family:'Sora',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0a0f;border-radius:14px;overflow:hidden;border:1px solid rgba(99,102,241,.12);">
<tr><td style="background:linear-gradient(135deg,#0d0d1a,#111128,#0d1a2e);padding:38px 36px 28px;text-align:center;border-bottom:1px solid rgba(99,102,241,.14);">
  <div style="width:64px;height:64px;background:linear-gradient(135deg,#1e1b4b,#0f172a);border-radius:50%;margin:0 auto 14px;border:1.5px solid rgba(99,102,241,.4);display:inline-block;line-height:64px;text-align:center;">
    <svg width="30" height="17" viewBox="0 0 60 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
      <path d="M30 17C30 17 24 6 15 6C8.37 6 3 10.93 3 17C3 23.07 8.37 28 15 28C24 28 30 17 30 17Z" stroke="url(#h1)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M30 17C30 17 36 28 45 28C51.63 28 57 23.07 57 17C57 10.93 51.63 6 45 6C36 6 30 17 30 17Z" stroke="url(#h2)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <defs><linearGradient id="h1" x1="3" y1="17" x2="30" y2="17"><stop stop-color="#818cf8"/><stop offset="1" stop-color="#06b6d4"/></linearGradient>
      <linearGradient id="h2" x1="30" y1="17" x2="57" y2="17"><stop stop-color="#06b6d4"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs>
    </svg>
  </div>
  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(99,102,241,.85);">N8N Data Science Community</p>
</td></tr>
<tr><td style="background:linear-gradient(180deg,#0d0d1a,#0a0a0f);padding:32px 36px 26px;border-bottom:1px solid rgba(255,255,255,.03);">
  <p style="margin:0 0 16px;display:inline-block;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.24);color:#818cf8;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:4px 14px;border-radius:100px;">${hero.badge}</p>
  <h1 style="margin:0 0 12px;font-size:27px;font-weight:800;line-height:1.22;color:#f1f5f9;letter-spacing:-.02em;">${hero.title} <span style="${gradCSS}">${hero.titleAccent}</span></h1>
  <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.75;font-weight:300;">${hero.body}</p>
</td></tr>
<tr><td style="padding:0 36px;"><div style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,.22),rgba(6,182,212,.12),transparent);"></div></td></tr>
${blocksHTML}
<tr><td style="padding:20px 36px 28px;text-align:center;border-top:1px solid rgba(255,255,255,.04);background:#07070e;">
  <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#2d3748;letter-spacing:.1em;">∞ N8N · DATA SCIENCE COMMUNITY</p>
  ${footer.socials.filter(s=>s.url).length>0?`<p style="margin:0 0 10px;">${footer.socials.filter(s=>s.url).map(s=>`<a href="${s.url}" style="font-size:10px;color:#334155;text-decoration:none;margin:0 8px;font-weight:500;">${s.platform}</a>`).join("")}</p>`:""}
  <p style="margin:0 0 4px;font-size:10px;color:#1e293b;line-height:1.7;">${footer.note}</p>
  <p style="margin:0;font-size:9px;color:#141820;letter-spacing:.1em;text-transform:uppercase;">Department of Mathematics · HBTU Kanpur</p>
  ${footer.unsubscribeUrl?`<p style="margin:8px 0 0;"><a href="${footer.unsubscribeUrl}" style="font-size:9px;color:#1a1a2e;text-decoration:underline;">Unsubscribe</a></p>`:""}
</td></tr>
</table></td></tr></table>
</body></html>`;
}

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const T = { bg0:"#04040c",bg1:"#08080f",bg2:"#0d0d1c",bg3:"#111125",border:"rgba(99,102,241,.13)",bh:"rgba(99,102,241,.28)",indigo:"#6366f1",cyan:"#06b6d4",il:"#818cf8",cl:"#67e8f9",t0:"#f1f5f9",t1:"#cbd5e1",t2:"#94a3b8",t3:"#64748b",t4:"#334155",t5:"#1e293b",red:"#ef4444",green:"#22c55e",amber:"#f59e0b",grad:"linear-gradient(135deg,#4f46e5,#0891b2)" };
const iBase = { width:"100%",background:"rgba(12,12,24,.9)",border:`1px solid ${T.border}`,borderRadius:6,color:T.t1,fontSize:12,padding:"8px 10px",outline:"none",fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.5,transition:"border .15s" };

/* ═══════════════════════════════════════════════════════
   UI ATOMS
═══════════════════════════════════════════════════════ */
function Inp({ label, value, onChange, multi, placeholder, mono, rows = 3 }) {
  const [f,setF]=useState(false);
  const s={...iBase,resize:multi?"vertical":"none",borderColor:f?T.indigo:T.border,fontFamily:mono?"monospace":"inherit"};
  return <div style={{marginBottom:9}}>
    {label&&<div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:4}}>{label}</div>}
    {multi?<textarea rows={rows} style={s} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)}/>
         :<input style={s} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)}/>}
  </div>;
}

function Tog({ label, checked, onChange, small }) {
  return <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:small?6:10,cursor:"pointer"}} onClick={()=>onChange(!checked)}>
    <div style={{width:28,height:16,borderRadius:8,background:checked?T.grad:"rgba(18,18,36,.8)",border:`1px solid ${checked?T.indigo:T.border}`,position:"relative",flexShrink:0,transition:"all .2s"}}>
      <div style={{position:"absolute",top:2,left:checked?12:2,width:10,height:10,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.4)"}}/>
    </div>
    <span style={{fontSize:11,color:checked?T.t2:T.t4,fontWeight:600,userSelect:"none"}}>{label}</span>
  </div>;
}

function Sel({ label, value, onChange, options }) {
  return <div style={{marginBottom:9}}>
    {label&&<div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:4}}>{label}</div>}
    <select style={{...iBase,appearance:"none",cursor:"pointer"}} value={value} onChange={e=>onChange(e.target.value)}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>;
}

function Chip({ label, active, onClick }) {
  return <button onClick={onClick} style={{padding:"4px 10px",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer",border:active?`1px solid ${T.indigo}`:`1px solid ${T.border}`,background:active?"rgba(99,102,241,.18)":"rgba(12,12,24,.7)",color:active?T.il:T.t4,transition:"all .15s",letterSpacing:".04em"}}>{label}</button>;
}

function Pill({ label, color = "indigo", onClick }) {
  const cols = { indigo:{bg:"rgba(99,102,241,.1)",border:"rgba(99,102,241,.25)",color:T.il}, cyan:{bg:"rgba(6,182,212,.1)",border:"rgba(6,182,212,.25)",color:T.cl}, green:{bg:"rgba(34,197,94,.1)",border:"rgba(34,197,94,.25)",color:T.green} };
  const c = cols[color]||cols.indigo;
  return <span onClick={onClick} style={{display:"inline-block",background:c.bg,border:`1px solid ${c.border}`,color:c.color,fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"3px 8px",borderRadius:100,cursor:onClick?"pointer":"default"}}>{label}</span>;
}

function Accordion({ title, icon, children, open: defOpen = true, badge }) {
  const [open,setOpen]=useState(defOpen);
  return <div style={{marginBottom:1,borderBottom:`1px solid rgba(99,102,241,.06)`}}>
    <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0 7px",cursor:"pointer",userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <span style={{fontSize:12}}>{icon}</span>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:T.cyan,opacity:.85}}>{title}</span>
        {badge&&<Pill label={badge} color="indigo"/>}
      </div>
      <span style={{color:T.t5,fontSize:9,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
    </div>
    {open&&<div style={{paddingBottom:12}}>{children}</div>}
  </div>;
}

/* ═══════════════════════════════════════════════════════
   BLOCK EDITORS
═══════════════════════════════════════════════════════ */
function FeatureEditor({ block, update }) {
  const setItem=(i,k,v)=>{const items=[...block.items];items[i]={...items[i],[k]:v};update({items})};
  const add=()=>update({items:[...block.items,{icon:"✨",title:"New Point",desc:"Describe it here."}]});
  const remove=i=>update({items:block.items.filter((_,j)=>j!==i)});
  const move=(i,d)=>{const a=[...block.items];const j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];update({items:a})};
  return <>
    <Inp label="Section Label" value={block.sectionLabel} onChange={v=>update({sectionLabel:v})} placeholder="// What we offer" mono/>
    {block.items.map((f,i)=><div key={i} style={{marginBottom:8,background:"rgba(12,12,24,.8)",border:`1px solid ${T.border}`,borderRadius:7,padding:"9px 9px 5px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:10,color:T.t5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em"}}>#{i+1}</span>
        <div style={{display:"flex",gap:3}}>
          {["↑","↓"].map((a,di)=><button key={a} onClick={()=>move(i,di===0?-1:1)} style={{background:"rgba(99,102,241,.07)",border:`1px solid ${T.border}`,borderRadius:4,color:T.t4,fontSize:10,padding:"2px 6px",cursor:"pointer"}}>{a}</button>)}
          <button onClick={()=>remove(i)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.18)",borderRadius:4,color:T.red,fontSize:10,padding:"2px 7px",cursor:"pointer",fontWeight:700}}>✕</button>
        </div>
      </div>
      <div style={{display:"flex",gap:6}}><div style={{flex:"0 0 50px"}}><Inp value={f.icon} onChange={v=>setItem(i,"icon",v)} placeholder="🚀"/></div><div style={{flex:1}}><Inp value={f.title} onChange={v=>setItem(i,"title",v)} placeholder="Title"/></div></div>
      <Inp value={f.desc} onChange={v=>setItem(i,"desc",v)} multi rows={2} placeholder="Description..."/>
    </div>)}
    <button onClick={add} style={{width:"100%",padding:"7px",borderRadius:6,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.22)",background:"transparent",color:T.indigo,cursor:"pointer",marginTop:2}}>+ Add Feature</button>
  </>;
}

function StatsEditor({ block, update }) {
  const set=(i,k,v)=>{const items=[...block.items];items[i]={...items[i],[k]:v};update({items})};
  const add=()=>update({items:[...block.items,{num:"",label:""}]});
  const rm=i=>update({items:block.items.filter((_,j)=>j!==i)});
  return <>
    {block.items.map((s,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"flex-start",marginBottom:5}}>
      <div style={{flex:"0 0 70px"}}><Inp value={s.num} onChange={v=>set(i,"num",v)} placeholder="200+" mono/></div>
      <div style={{flex:1}}><Inp value={s.label} onChange={v=>set(i,"label",v)} placeholder="Label"/></div>
      <button onClick={()=>rm(i)} style={{marginTop:0,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.16)",borderRadius:4,color:T.red,fontSize:10,padding:"8px 7px",cursor:"pointer",fontWeight:700,flexShrink:0}}>✕</button>
    </div>)}
    {block.items.length<5&&<button onClick={add} style={{width:"100%",padding:"6px",borderRadius:6,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.22)",background:"transparent",color:T.indigo,cursor:"pointer"}}>+ Add Stat</button>}
  </>;
}

function CtaEditor({ block, update }) {
  return <>
    <Inp label="Button Text" value={block.text} onChange={v=>update({text:v})} placeholder="Join Now →"/>
    <Inp label="Button URL" value={block.link} onChange={v=>update({link:v})} placeholder="https://..." mono/>
    <Inp label="Sub-line" value={block.sub} onChange={v=>update({sub:v})} placeholder="Supporting text"/>
    <div style={{display:"flex",gap:8,marginBottom:9}}>
      <div style={{flex:1}}><Sel label="Style" value={block.style||"solid"} onChange={v=>update({style:v})} options={[{value:"solid",label:"Solid Gradient"},{value:"outline",label:"Outline"},{value:"ghost",label:"Ghost / Text"}]}/></div>
      <div style={{flex:1}}><Sel label="Align" value={block.align||"center"} onChange={v=>update({align:v})} options={[{value:"center",label:"Center"},{value:"left",label:"Left"}]}/></div>
    </div>
  </>;
}

function CalloutEditor({ block, update }) {
  return <>
    <Inp label="Callout Text" value={block.text} onChange={v=>update({text:v})} multi placeholder="Key highlight or important note..."/>
    <Sel label="Color" value={block.style||"indigo"} onChange={v=>update({style:v})} options={[{value:"indigo",label:"Indigo"},{value:"cyan",label:"Cyan"},{value:"warning",label:"Amber / Warning"},{value:"green",label:"Green / Success"}]}/>
  </>;
}

function InfoEditor({ block, update }) {
  const set=(i,k,v)=>{const rows=[...block.rows];rows[i]={...rows[i],[k]:v};update({rows})};
  const add=()=>update({rows:[...block.rows,{key:"Key",val:"Value"}]});
  const rm=i=>update({rows:block.rows.filter((_,j)=>j!==i)});
  return <>
    <Inp label="Section Title" value={block.title} onChange={v=>update({title:v})} placeholder="// Details" mono/>
    {block.rows.map((r,i)=><div key={i} style={{display:"flex",gap:5,alignItems:"center",marginBottom:5}}>
      <input style={{...iBase,width:74,flexShrink:0}} value={r.key} onChange={e=>set(i,"key",e.target.value)} placeholder="Key"/>
      <input style={{...iBase,flex:1}} value={r.val} onChange={e=>set(i,"val",e.target.value)} placeholder="Value"/>
      <button onClick={()=>rm(i)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.16)",borderRadius:4,color:T.red,fontSize:10,padding:"8px 7px",cursor:"pointer",fontWeight:700,flexShrink:0}}>✕</button>
    </div>)}
    <button onClick={add} style={{width:"100%",padding:"6px",borderRadius:6,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.22)",background:"transparent",color:T.indigo,cursor:"pointer",marginTop:2}}>+ Add Row</button>
  </>;
}

function TextEditor({ block, update }) {
  return <>
    <Inp label="Content" value={block.content} onChange={v=>update({content:v})} multi rows={5} placeholder="Write your text..."/>
    <div style={{display:"flex",gap:8}}>
      <div style={{flex:1}}><Sel label="Size" value={block.size||"md"} onChange={v=>update({size:v})} options={[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}]}/></div>
      <div style={{flex:1}}><Sel label="Align" value={block.align||"left"} onChange={v=>update({align:v})} options={[{value:"left",label:"Left"},{value:"center",label:"Center"}]}/></div>
    </div>
  </>;
}

function ChecklistEditor({ block, update }) {
  const set=(i,v)=>{const items=[...block.items];items[i]={...items[i],text:v};update({items})};
  const add=()=>update({items:[...block.items,{text:"New item"}]});
  const rm=i=>update({items:block.items.filter((_,j)=>j!==i)});
  return <>
    <Inp label="Title" value={block.title} onChange={v=>update({title:v})} placeholder="What to expect"/>
    {block.items.map((it,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:5}}>
      <div style={{width:18,height:18,background:T.grad,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:9,color:"#fff",fontWeight:700}}>✓</span>
      </div>
      <input style={{...iBase,flex:1}} value={it.text} onChange={e=>set(i,e.target.value)} placeholder="Checklist item"/>
      <button onClick={()=>rm(i)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.16)",borderRadius:4,color:T.red,fontSize:10,padding:"8px 7px",cursor:"pointer",fontWeight:700,flexShrink:0}}>✕</button>
    </div>)}
    <button onClick={add} style={{width:"100%",padding:"6px",borderRadius:6,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.22)",background:"transparent",color:T.indigo,cursor:"pointer",marginTop:2}}>+ Add Item</button>
  </>;
}

function QuoteEditor({ block, update }) {
  return <>
    <Inp label="Quote Text" value={block.text} onChange={v=>update({text:v})} multi placeholder="An inspiring quote..."/>
    <Inp label="Attribution" value={block.author} onChange={v=>update({author:v})} placeholder="— Author Name"/>
  </>;
}

function ImageEditor({ block, update }) {
  return <>
    <Inp label="Image URL" value={block.url} onChange={v=>update({url:v})} placeholder="https://..." mono/>
    <Inp label="Alt Text" value={block.alt} onChange={v=>update({alt:v})} placeholder="Describe the image"/>
    <Inp label="Caption" value={block.caption} onChange={v=>update({caption:v})} placeholder="Optional caption"/>
    <Tog label="Rounded corners" checked={block.rounded!==false} onChange={v=>update({rounded:v})}/>
  </>;
}

function DividerEditor({ block, update }) {
  return <Sel label="Style" value={block.style||"gradient"} onChange={v=>update({style:v})} options={[{value:"gradient",label:"Gradient Fade"},{value:"solid",label:"Solid Line"},{value:"dots",label:"Dots"}]}/>;
}

function SocialsEditor({ block, update }) {
  const set=(i,k,v)=>{const links=[...block.links];links[i]={...links[i],[k]:v};update({links})};
  const add=()=>update({links:[...block.links,{platform:"Website",url:""}]});
  const rm=i=>update({links:block.links.filter((_,j)=>j!==i)});
  return <>
    {block.links.map((l,i)=><div key={i} style={{display:"flex",gap:5,marginBottom:5}}>
      <input style={{...iBase,width:90,flexShrink:0}} value={l.platform} onChange={e=>set(i,"platform",e.target.value)} placeholder="LinkedIn"/>
      <input style={{...iBase,flex:1}} value={l.url} onChange={e=>set(i,"url",e.target.value)} placeholder="https://..."/>
      <button onClick={()=>rm(i)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.16)",borderRadius:4,color:T.red,fontSize:10,padding:"8px 7px",cursor:"pointer",fontWeight:700,flexShrink:0}}>✕</button>
    </div>)}
    <button onClick={add} style={{width:"100%",padding:"6px",borderRadius:6,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.22)",background:"transparent",color:T.indigo,cursor:"pointer"}}>+ Add Link</button>
  </>;
}

function SpacerEditor({ block, update }) {
  return <div>
    <div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:6}}>Height (px)</div>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <input type="range" min="8" max="80" value={block.height||24} onChange={e=>update({height:+e.target.value})} style={{flex:1,accentColor:T.indigo}}/>
      <span style={{fontSize:12,color:T.t2,fontFamily:"monospace",width:30}}>{block.height||24}</span>
    </div>
  </div>;
}

const BLOCK_EDITORS = { features:FeatureEditor,stats:StatsEditor,cta:CtaEditor,callout:CalloutEditor,info:InfoEditor,text:TextEditor,checklist:ChecklistEditor,quote:QuoteEditor,image:ImageEditor,divider:DividerEditor,socials:SocialsEditor,spacer:SpacerEditor };

/* ═══════════════════════════════════════════════════════
   BLOCK ROW
═══════════════════════════════════════════════════════ */
function BlockRow({ block, idx, total, onUpdate, onRemove, onMove, onDupe }) {
  const [open,setOpen]=useState(false);
  const meta = BLOCK_TYPES[block.type]||{label:block.type,icon:"▪"};
  const Editor = BLOCK_EDITORS[block.type];
  const updateBlock = useCallback((patch)=>onUpdate(idx,patch),[idx,onUpdate]);
  return <div style={{marginBottom:4,background:open?"rgba(12,12,24,.95)":"rgba(10,10,20,.6)",border:`1px solid ${open?T.bh:T.border}`,borderRadius:8,overflow:"hidden",transition:"all .15s"}}>
    <div style={{display:"flex",alignItems:"center",gap:0,padding:"7px 8px",cursor:"pointer"}}>
      <div onClick={()=>setOpen(o=>!o)} style={{flex:1,display:"flex",alignItems:"center",gap:7}}>
        <span style={{fontSize:11}}>{meta.icon}</span>
        <span style={{fontSize:11,fontWeight:700,color:open?T.t1:T.t3,letterSpacing:".04em"}}>{meta.label}</span>
      </div>
      <div style={{display:"flex",gap:3,alignItems:"center"}}>
        <Tog small checked={block.visible} onChange={v=>onUpdate(idx,{visible:v})}/>
        <button onClick={()=>onMove(idx,-1)} disabled={idx===0} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:4,color:idx===0?T.t5:T.t3,fontSize:9,padding:"2px 5px",cursor:idx===0?"default":"pointer"}}>↑</button>
        <button onClick={()=>onMove(idx,1)} disabled={idx===total-1} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:4,color:idx===total-1?T.t5:T.t3,fontSize:9,padding:"2px 5px",cursor:idx===total-1?"default":"pointer"}}>↓</button>
        <button onClick={()=>onDupe(idx)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:4,color:T.t3,fontSize:9,padding:"2px 5px",cursor:"pointer"}} title="Duplicate">⎘</button>
        <button onClick={()=>onRemove(idx)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.15)",borderRadius:4,color:T.red,fontSize:9,padding:"2px 5px",cursor:"pointer",fontWeight:700}}>✕</button>
        <span onClick={()=>setOpen(o=>!o)} style={{color:T.t5,fontSize:9,marginLeft:2,transform:open?"rotate(180deg)":"none",transition:"transform .2s",userSelect:"none"}}>▼</span>
      </div>
    </div>
    {open&&Editor&&<div style={{borderTop:`1px solid ${T.border}`,padding:"10px 10px 6px"}}><Editor block={block} update={updateBlock}/></div>}
  </div>;
}

/* ═══════════════════════════════════════════════════════
   EMAIL PREVIEW
═══════════════════════════════════════════════════════ */
function InfSVG({s=30}){return <svg width={s} height={s*.57} viewBox="0 0 60 34" fill="none"><path d="M30 17C30 17 24 6 15 6C8.37 6 3 10.93 3 17C3 23.07 8.37 28 15 28C24 28 30 17 30 17Z" stroke="url(#pi1)" strokeWidth="3.5" strokeLinecap="round" fill="none"/><path d="M30 17C30 17 36 28 45 28C51.63 28 57 23.07 57 17C57 10.93 51.63 6 45 6C36 6 30 17 30 17Z" stroke="url(#pi2)" strokeWidth="3.5" strokeLinecap="round" fill="none"/><defs><linearGradient id="pi1" x1="3" y1="17" x2="30" y2="17"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#06b6d4"/></linearGradient><linearGradient id="pi2" x1="30" y1="17" x2="57" y2="17"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#818cf8"/></linearGradient></defs></svg>}

function BlockPreview({ block, theme }) {
  if(!block.visible) return null;
  const gS={background:"linear-gradient(90deg,#818cf8,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"};
  const ac1=theme.ac1||"#4f46e5", ac2=theme.ac2||"#0891b2";
  switch(block.type){
    case "features": return <div style={{padding:"22px 32px 8px"}}>
      {block.sectionLabel&&<div style={{fontSize:10,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:"rgba(6,182,212,.7)",marginBottom:14,fontFamily:"monospace"}}>{block.sectionLabel}</div>}
      {(block.items||[]).map((f,i)=><div key={i} style={{display:"flex",gap:11,marginBottom:13}}>
        <div style={{width:33,height:33,flexShrink:0,background:"linear-gradient(135deg,rgba(99,102,241,.13),rgba(6,182,212,.07))",border:"1px solid rgba(99,102,241,.18)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{f.icon}</div>
        <div><div style={{fontSize:12,fontWeight:700,color:T.t0,marginBottom:2}}>{f.title}</div><div style={{fontSize:11,color:T.t3,lineHeight:1.5,fontWeight:300}}>{f.desc}</div></div>
      </div>)}
    </div>;
    case "stats": return <div style={{padding:"8px 32px 20px"}}>
      <div style={{background:"rgba(13,13,26,.95)",border:"1px solid rgba(99,102,241,.11)",borderRadius:9,display:"flex"}}>
        {(block.items||[]).map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"14px 0",borderLeft:i>0?"1px solid rgba(99,102,241,.09)":"none"}}>
          <div style={{...gS,fontSize:19,fontWeight:800,fontFamily:"monospace",marginBottom:3}}>{s.num}</div>
          <div style={{fontSize:8,color:T.t4,letterSpacing:".1em",textTransform:"uppercase",fontWeight:600}}>{s.label}</div>
        </div>)}
      </div>
    </div>;
    case "cta": return <div style={{padding:"6px 32px 20px",textAlign:block.align||"center"}}>
      <a href={block.link||"#"} style={{display:"inline-block",background:block.style==="solid"?`linear-gradient(135deg,${ac1},${ac2})`:block.style==="outline"?"transparent":"transparent",color:block.style==="solid"?"#fff":ac1,textDecoration:"none",fontSize:13,fontWeight:700,letterSpacing:".04em",padding:"11px 34px",borderRadius:7,border:block.style==="outline"?`2px solid ${ac1}`:"none",boxShadow:block.style==="solid"?"0 4px 20px rgba(79,70,229,.25)":"none"}}>{block.text||"Click Here →"}</a>
      {block.sub&&<div style={{fontSize:10,color:T.t4,marginTop:8,fontWeight:300}}>{block.sub}</div>}
    </div>;
    case "callout": {
      const cols={indigo:{bg:"rgba(99,102,241,.07)",bl:`3px solid ${ac1}`},cyan:{bg:"rgba(6,182,212,.07)",bl:"3px solid #06b6d4"},warning:{bg:"rgba(245,158,11,.07)",bl:"3px solid #f59e0b"},green:{bg:"rgba(34,197,94,.07)",bl:"3px solid #22c55e"}};
      const c=cols[block.style||"indigo"]||cols.indigo;
      return <div style={{padding:"0 32px 18px"}}>
        <div style={{background:c.bg,borderLeft:c.bl,borderRadius:"0 7px 7px 0",padding:"13px 14px"}}>
          <div style={{fontSize:12,color:T.t2,lineHeight:1.65}}>{block.text}</div>
        </div>
      </div>;
    }
    case "info": return <div style={{padding:"0 32px 22px"}}>
      <div style={{background:"rgba(6,182,212,.04)",border:"1px solid rgba(6,182,212,.1)",borderRadius:9,padding:"14px 16px"}}>
        {block.title&&<div style={{fontSize:9,fontWeight:700,color:"#06b6d4",letterSpacing:".15em",textTransform:"uppercase",marginBottom:9,fontFamily:"monospace"}}>{block.title}</div>}
        {(block.rows||[]).map((r,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:i<block.rows.length-1?5:0}}>
          <div style={{fontSize:10,color:T.t4,fontWeight:600,width:68,flexShrink:0}}>{r.key}</div>
          <div style={{fontSize:10,color:T.t1,fontWeight:300}}>{r.val}</div>
        </div>)}
      </div>
    </div>;
    case "text": return <div style={{padding:"0 32px 18px",textAlign:block.align||"left"}}>
      <div style={{fontSize:block.size==="lg"?14:block.size==="sm"?11:12,color:T.t2,lineHeight:1.8,fontWeight:300,whiteSpace:"pre-line"}}>{block.content}</div>
    </div>;
    case "checklist": return <div style={{padding:"0 32px 18px"}}>
      {block.title&&<div style={{fontSize:12,fontWeight:700,color:T.t0,marginBottom:10}}>{block.title}</div>}
      {(block.items||[]).map((it,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:7}}>
        <div style={{width:16,height:16,background:`linear-gradient(135deg,${ac1},${ac2})`,borderRadius:3,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
          <span style={{fontSize:8,color:"#fff",fontWeight:700}}>✓</span>
        </div>
        <div style={{fontSize:12,color:T.t2,lineHeight:1.5}}>{it.text}</div>
      </div>)}
    </div>;
    case "quote": return <div style={{padding:"0 32px 20px"}}>
      <div style={{border:"1px solid rgba(99,102,241,.17)",borderRadius:9,padding:"18px 20px",background:"rgba(99,102,241,.04)",textAlign:"center"}}>
        <div style={{fontSize:20,color:"rgba(99,102,241,.35)",fontFamily:"Georgia,serif",marginBottom:8}}>"</div>
        <div style={{fontSize:13,color:T.t1,lineHeight:1.7,fontStyle:"italic",marginBottom:8}}>{block.text}</div>
        {block.author&&<div style={{fontSize:10,color:T.t4,fontWeight:600,letterSpacing:".05em"}}>{block.author}</div>}
      </div>
    </div>;
    case "image": return block.url?<div style={{padding:"0 32px 18px",textAlign:"center"}}>
      <img src={block.url} alt={block.alt||""} style={{maxWidth:"100%",borderRadius:block.rounded!==false?9:3,border:"1px solid rgba(99,102,241,.1)"}}/>
      {block.caption&&<div style={{fontSize:10,color:T.t4,marginTop:6,fontStyle:"italic"}}>{block.caption}</div>}
    </div>:null;
    case "divider": return <div style={{padding:"6px 32px 6px"}}>
      {block.style==="dots"?<div style={{textAlign:"center",color:T.t5,letterSpacing:".3em",fontSize:12,padding:"3px 0"}}>· · ·</div>
      :block.style==="solid"?<div style={{height:1,background:"rgba(99,102,241,.12)"}}/>
      :<div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.22),rgba(6,182,212,.12),transparent)"}}/>}
    </div>;
    case "socials": return <div style={{padding:"0 32px 18px",textAlign:"center"}}>
      {(block.links||[]).map((l,i)=><span key={i} style={{display:"inline-block",margin:"0 5px",background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.2)",borderRadius:6,padding:"6px 14px",fontSize:10,fontWeight:700,color:T.il,letterSpacing:".05em"}}>{l.platform}</span>)}
    </div>;
    case "spacer": return <div style={{height:block.height||24}}/>;
    default: return null;
  }
}

function EmailPreview({ state, width=560 }) {
  const { hero, blocks, footer, theme } = state;
  const gS={background:"linear-gradient(90deg,#818cf8,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"};
  return <div style={{width,fontFamily:"'Sora',sans-serif",background:"#0a0a0f",borderRadius:12,overflow:"hidden",border:"1px solid rgba(99,102,241,.11)",boxShadow:"0 0 60px rgba(0,0,0,.6)"}}>
    <div style={{background:"linear-gradient(135deg,#0d0d1a,#111128,#0d1a2e)",padding:"34px 32px 26px",textAlign:"center",borderBottom:"1px solid rgba(99,102,241,.13)"}}>
      <div style={{width:58,height:58,background:"linear-gradient(135deg,#1e1b4b,#0f172a)",borderRadius:"50%",margin:"0 auto 12px",border:"1.5px solid rgba(99,102,241,.4)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 22px rgba(99,102,241,.16)"}}>
        <InfSVG s={28}/>
      </div>
      <div style={{fontSize:9,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:"rgba(99,102,241,.8)"}}>N8N Data Science Community</div>
    </div>
    <div style={{background:"linear-gradient(180deg,#0d0d1a,#0a0a0f)",padding:"28px 32px 22px",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
      <div style={{display:"inline-block",background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.23)",color:"#818cf8",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",padding:"3px 12px",borderRadius:100,marginBottom:13}}>{hero.badge||"N8N Community"}</div>
      <div style={{fontSize:22,fontWeight:800,lineHeight:1.22,color:T.t0,letterSpacing:"-.02em",marginBottom:10}}>
        {hero.title}&nbsp;<span style={gS}>{hero.titleAccent}</span>
      </div>
      <div style={{fontSize:13,color:T.t2,lineHeight:1.75,fontWeight:300}}>{hero.body}</div>
    </div>
    <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.2),rgba(6,182,212,.1),transparent)",margin:"0 32px"}}/>
    {(blocks||[]).map(b=><BlockPreview key={b.id} block={b} theme={theme}/>)}
    <div style={{padding:"16px 32px 24px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,.04)",background:"#07070e"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:8}}><InfSVG s={14}/><span style={{fontSize:9,fontWeight:700,color:"#2a2a3a",letterSpacing:".1em"}}>N8N · DATA SCIENCE COMMUNITY</span></div>
      {footer.socials.filter(s=>s.url).length>0&&<div style={{marginBottom:8}}>{footer.socials.filter(s=>s.url).map((s,i)=><span key={i} style={{fontSize:9,color:T.t5,margin:"0 7px",fontWeight:500}}>{s.platform}</span>)}</div>}
      <div style={{fontSize:9,color:"#1c1c2a",lineHeight:1.7}}>{footer.note}</div>
      <div style={{fontSize:8,color:"#141420",marginTop:3,letterSpacing:".1em",textTransform:"uppercase"}}>Dept. of Mathematics · HBTU Kanpur</div>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
const INIT_STATE = {
  meta: { subject:"", previewText:"", fromName:"N8N Data Science Community" },
  hero: { badge:"✦ HBTU Kanpur · Upcoming Session", title:"Python & Machine Learning", titleAccent:"Session This Sunday", body:"Join us for an interactive hands-on session where we'll build your first ML model from scratch. No prior experience needed — just bring curiosity and your laptop." },
  blocks: PRESETS.session.blocks,
  footer: { note:"You received this as a member of the N8N Data Science Community.", socials:[{platform:"LinkedIn",url:""},{platform:"GitHub",url:""},{platform:"Instagram",url:""}], unsubscribeUrl:"" },
  theme: { ac1:"#4f46e5", ac2:"#0891b2" },
};

export default function App() {
  const [state, setState] = useState(INIT_STATE);
  const [activePreset, setActivePreset] = useState("session");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [mobileTab, setMobileTab] = useState("editor");
  const [exportStatus, setExportStatus] = useState(null);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [draftName, setDraftName] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [history, setHistory] = useState([INIT_STATE]);
  const [histIdx, setHistIdx] = useState(0);
  const histRef = useRef(false);

  const set = useCallback((patch)=>{
    setState(prev=>{
      const next={...prev,...patch};
      if(!histRef.current){
        setHistory(h=>{const nh=[...h.slice(0,histIdx+1),next];setHistIdx(nh.length-1);return nh.slice(-20);});
      }
      return next;
    });
  },[histIdx]);

  const undo=()=>{ if(histIdx>0){histRef.current=true;const ni=histIdx-1;setState(history[ni]);setHistIdx(ni);setTimeout(()=>{histRef.current=false},50);} };
  const redo=()=>{ if(histIdx<history.length-1){histRef.current=true;const ni=histIdx+1;setState(history[ni]);setHistIdx(ni);setTimeout(()=>{histRef.current=false},50);} };

  // Load drafts from storage
  useEffect(()=>{
    (async()=>{
      try{const r=await window.storage.list("draft-");setSavedDrafts((r?.keys||[]).map(k=>k.replace("draft-","")));}catch(e){}
    })();
  },[]);

  const saveDraft=async()=>{
    const name=draftName.trim()||`Draft ${new Date().toLocaleDateString()}`;
    try{
      await window.storage.set(`draft-${name}`,JSON.stringify(state));
      setSavedDrafts(prev=>[...new Set([...prev,name])]);
      setDraftName("");
      flash("saved");
    }catch(e){flash("error");}
  };

  const loadDraft=async(name)=>{
    try{const r=await window.storage.get(`draft-${name}`);if(r?.value){setState(JSON.parse(r.value));setShowDrafts(false);flash("loaded");}}catch(e){}
  };

  const deleteDraft=async(name)=>{
    try{await window.storage.delete(`draft-${name}`);setSavedDrafts(prev=>prev.filter(n=>n!==name));}catch(e){}
  };

  const flash=(msg)=>{setExportStatus(msg);setTimeout(()=>setExportStatus(null),2200);};

  const updateBlocks=(fn)=>set({blocks:fn(state.blocks)});
  const updateBlock=(idx,patch)=>updateBlocks(bs=>{const n=[...bs];n[idx]={...n[idx],...patch};return n;});
  const removeBlock=(idx)=>updateBlocks(bs=>bs.filter((_,i)=>i!==idx));
  const moveBlock=(idx,d)=>updateBlocks(bs=>{const n=[...bs];const j=idx+d;if(j<0||j>=n.length)return n;[n[idx],n[j]]=[n[j],n[idx]];return n;});
  const dupeBlock=(idx)=>updateBlocks(bs=>{const n=[...bs];const copy={...JSON.parse(JSON.stringify(bs[idx])),id:uid()};n.splice(idx+1,0,copy);return n;});
  const addBlock=(type)=>{updateBlocks(bs=>[...bs,{id:uid(),type,visible:true,...JSON.parse(JSON.stringify(BLOCK_DEFAULTS[type]||{}))}]);setShowAddBlock(false);};

  const loadPreset=(key)=>{
    const p=PRESETS[key];
    set({hero:{badge:p.badge,title:p.title,titleAccent:p.titleAccent,body:p.body},blocks:p.blocks});
    setActivePreset(key);
  };

  const handleCopy=()=>{navigator.clipboard.writeText(buildHTML(state)).then(()=>flash("copied")).catch(()=>flash("error"));};
  const handleDownload=()=>{
    const b=new Blob([buildHTML(state)],{type:"text/html"});
    const a=document.createElement("a");a.href=URL.createObjectURL(b);
    a.download=`n8n-${state.meta.subject.replace(/\s+/g,"-").toLowerCase()||"email"}.html`;
    a.click();URL.revokeObjectURL(a.href);flash("downloaded");
  };
  const handleGmail=()=>{
    const s=encodeURIComponent(state.meta.subject||`${state.hero.title} ${state.hero.titleAccent} — N8N`);
    const b=encodeURIComponent(`${state.hero.body}\n\n[Full formatted email — paste the downloaded HTML into Gmail]\n${state.blocks.filter(b=>b.visible&&b.type==="cta"&&b.link).map(b=>b.link).join("\n")}`);
    window.open(`https://mail.google.com/mail/?view=cm&su=${s}&body=${b}`,"_blank");flash("gmail");
  };
  const handlePreview=()=>{
    const w=window.open("","_blank");
    w.document.write(buildHTML(state));w.document.close();
  };

  /* ── STYLES ── */
  const topBtn=(active,color="indigo")=>({padding:"5px 11px",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer",border:active?`1px solid ${T[color+""]||T.indigo}`:`1px solid ${T.border}`,background:active?"rgba(99,102,241,.18)":"transparent",color:active?T.il:T.t4,transition:"all .15s",letterSpacing:".05em"});
  const exportBtn=(s,key)=>({padding:"6px 11px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",background:exportStatus===key?"rgba(34,197,94,.12)":"rgba(99,102,241,.09)",border:`1px solid ${exportStatus===key?"rgba(34,197,94,.3)":T.border}`,color:exportStatus===key?T.green:T.il,transition:"all .2s"});
  const pw = previewMode==="mobile"?375:560;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:T.bg0,fontFamily:"'Sora','Segoe UI',sans-serif",color:T.t1,overflow:"hidden"}}>

      {/* ─ TOP BAR ─ */}
      <div style={{background:"rgba(6,6,14,.97)",borderBottom:`1px solid ${T.border}`,padding:"9px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"linear-gradient(135deg,#1e1b4b,#0f172a)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(99,102,241,.35)",boxShadow:"0 0 14px rgba(99,102,241,.14)"}}>
            <InfSVG s={16}/>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:800,color:T.t0}}>N8N Email Builder</div>
            <div style={{fontSize:8,color:T.t5,fontWeight:600,letterSpacing:".14em",textTransform:"uppercase"}}>HBTU · Data Science Community</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          {/* Undo/Redo */}
          <div style={{display:"flex",gap:3}}>
            <button onClick={undo} disabled={histIdx===0} title="Undo" style={{...topBtn(false),opacity:histIdx===0?.35:1}}>↩</button>
            <button onClick={redo} disabled={histIdx>=history.length-1} title="Redo" style={{...topBtn(false),opacity:histIdx>=history.length-1?.35:1}}>↪</button>
          </div>
          {/* Preview mode */}
          <div style={{display:"flex",gap:3}}>
            <button onClick={()=>setPreviewMode("desktop")} style={topBtn(previewMode==="desktop")}>🖥 Desktop</button>
            <button onClick={()=>setPreviewMode("mobile")} style={topBtn(previewMode==="mobile")}>📱 Mobile</button>
          </div>
          {/* Mobile editor/preview tabs */}
          <div style={{display:"flex",gap:3}}>
            <button onClick={()=>setMobileTab("editor")} style={topBtn(mobileTab==="editor")}>✏</button>
            <button onClick={()=>setMobileTab("preview")} style={topBtn(mobileTab==="preview")}>👁</button>
          </div>
          {/* Drafts */}
          <button onClick={()=>setShowDrafts(d=>!d)} style={topBtn(showDrafts)}>💾 Drafts {savedDrafts.length>0&&`(${savedDrafts.length})`}</button>
          {/* Exports */}
          <button onClick={handleCopy} style={exportBtn(exportStatus,"copied")}>📋 {exportStatus==="copied"?"Copied!":"Copy"}</button>
          <button onClick={handleDownload} style={exportBtn(exportStatus,"downloaded")}>⬇ {exportStatus==="downloaded"?"Done!":"Download"}</button>
          <button onClick={handleGmail} style={exportBtn(exportStatus,"gmail")}>✉️ Gmail</button>
          <button onClick={handlePreview} style={exportBtn(exportStatus,"prev")}>↗ Preview</button>
        </div>
      </div>

      {/* ─ DRAFTS PANEL ─ */}
      {showDrafts&&<div style={{background:"rgba(8,8,18,.98)",borderBottom:`1px solid ${T.border}`,padding:"12px 16px",display:"flex",gap:12,alignItems:"center",flexShrink:0,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input style={{...iBase,width:160}} value={draftName} onChange={e=>setDraftName(e.target.value)} placeholder="Draft name (optional)"/>
          <button onClick={saveDraft} style={{padding:"7px 14px",borderRadius:6,fontSize:11,fontWeight:700,background:T.grad,color:"#fff",border:"none",cursor:"pointer"}}>{exportStatus==="saved"?"✓ Saved!":"Save Draft"}</button>
        </div>
        {savedDrafts.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {savedDrafts.map(n=><div key={n} style={{display:"flex",gap:4,alignItems:"center",background:"rgba(99,102,241,.1)",border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 4px 4px 10px"}}>
            <span style={{fontSize:11,color:T.t2,fontWeight:600}}>{n}</span>
            <button onClick={()=>loadDraft(n)} style={{fontSize:10,background:"none",border:"none",color:T.il,cursor:"pointer",fontWeight:700}}>Load</button>
            <button onClick={()=>deleteDraft(n)} style={{fontSize:10,background:"none",border:"none",color:T.red,cursor:"pointer",fontWeight:700}}>✕</button>
          </div>)}
        </div>}
        {exportStatus==="loaded"&&<Pill label="✓ Loaded!" color="green"/>}
      </div>}

      {/* ─ MAIN ─ */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>

        {/* ── EDITOR ── */}
        <div className="editor-pane" style={{width:292,flexShrink:0,overflowY:"auto",background:"rgba(6,6,14,.99)",borderRight:`1px solid ${T.border}`,padding:"12px 12px 60px",display:mobileTab==="preview"?"none":"block"}}>
          <style>{`@media(min-width:768px){.editor-pane{display:block!important}.preview-pane{display:flex!important}}.editor-pane::-webkit-scrollbar{width:3px}.editor-pane::-webkit-scrollbar-thumb{background:rgba(99,102,241,.2);border-radius:2px}select option{background:#0d0d1c;color:#e2e8f0}`}</style>

          {/* Presets */}
          <Accordion title="Presets" icon="⚡" open={true}>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {Object.entries(PRESETS).map(([k,v])=><Chip key={k} label={v.label} active={activePreset===k} onClick={()=>loadPreset(k)}/>)}
            </div>
          </Accordion>

          {/* Meta */}
          <Accordion title="Email Meta" icon="📧">
            <Inp label="Subject Line" value={state.meta.subject} onChange={v=>set({meta:{...state.meta,subject:v}})} placeholder="Python & ML Session — N8N Community"/>
            <Inp label="Preview Text" value={state.meta.previewText} onChange={v=>set({meta:{...state.meta,previewText:v}})} placeholder="Shown under subject in inbox..."/>
            <Inp label="Sender Name" value={state.meta.fromName} onChange={v=>set({meta:{...state.meta,fromName:v}})} placeholder="N8N Data Science Community"/>
          </Accordion>

          {/* Hero */}
          <Accordion title="Header & Hero" icon="✦">
            <Inp label="Badge" value={state.hero.badge} onChange={v=>set({hero:{...state.hero,badge:v}})} placeholder="✦ Tag · HBTU"/>
            <Inp label="Title (plain)" value={state.hero.title} onChange={v=>set({hero:{...state.hero,title:v}})}/>
            <Inp label="Title (gradient accent)" value={state.hero.titleAccent} onChange={v=>set({hero:{...state.hero,titleAccent:v}})} placeholder="Accent part of title"/>
            <Inp label="Opening body" value={state.hero.body} onChange={v=>set({hero:{...state.hero,body:v}})} multi rows={4} placeholder="Your opening message..."/>
          </Accordion>

          {/* Blocks */}
          <Accordion title={`Content Blocks`} icon="▦" badge={`${state.blocks.length}`}>
            {state.blocks.map((b,i)=><BlockRow key={b.id} block={b} idx={i} total={state.blocks.length} onUpdate={updateBlock} onRemove={removeBlock} onMove={moveBlock} onDupe={dupeBlock}/>)}
            {/* Add Block */}
            <div style={{position:"relative",marginTop:8}}>
              <button onClick={()=>setShowAddBlock(a=>!a)} style={{width:"100%",padding:"8px",borderRadius:7,fontSize:11,fontWeight:700,border:"1px dashed rgba(99,102,241,.28)",background:"transparent",color:T.indigo,cursor:"pointer",letterSpacing:".04em"}}>+ Add Block</button>
              {showAddBlock&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:0,right:0,background:"rgba(10,10,20,.98)",border:`1px solid ${T.bh}`,borderRadius:9,padding:10,zIndex:50,display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {Object.entries(BLOCK_TYPES).map(([k,v])=><button key={k} onClick={()=>addBlock(k)} style={{padding:"7px 8px",borderRadius:6,fontSize:10,fontWeight:700,border:`1px solid ${T.border}`,background:"rgba(14,14,28,.8)",color:T.t3,cursor:"pointer",textAlign:"left",display:"flex",gap:5,alignItems:"center",transition:"all .12s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.indigo;e.currentTarget.style.color=T.il}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.t3}}>
                  <span>{v.icon}</span><span>{v.label}</span>
                </button>)}
              </div>}
            </div>
          </Accordion>

          {/* Footer */}
          <Accordion title="Footer" icon="—" open={false}>
            <Inp label="Footer Note" value={state.footer.note} onChange={v=>set({footer:{...state.footer,note:v}})} multi placeholder="You received this because..."/>
            <Inp label="Unsubscribe URL" value={state.footer.unsubscribeUrl} onChange={v=>set({footer:{...state.footer,unsubscribeUrl:v}})} placeholder="https://..." mono/>
            <div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8,marginTop:4}}>Social Links</div>
            {state.footer.socials.map((s,i)=><div key={i} style={{display:"flex",gap:5,marginBottom:5}}>
              <input style={{...iBase,width:88,flexShrink:0}} value={s.platform} onChange={e=>{const sl=[...state.footer.socials];sl[i]={...sl[i],platform:e.target.value};set({footer:{...state.footer,socials:sl}});}} placeholder="Platform"/>
              <input style={{...iBase,flex:1}} value={s.url} onChange={e=>{const sl=[...state.footer.socials];sl[i]={...sl[i],url:e.target.value};set({footer:{...state.footer,socials:sl}});}} placeholder="https://..."/>
            </div>)}
          </Accordion>

          {/* Theme */}
          <Accordion title="Theme & Colors" icon="🎨" open={false}>
            <div style={{display:"flex",gap:12,marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:5}}>Accent Start</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <input type="color" value={state.theme.ac1} onChange={e=>set({theme:{...state.theme,ac1:e.target.value}})} style={{width:36,height:28,border:`1px solid ${T.border}`,borderRadius:5,background:"none",cursor:"pointer",padding:2}}/>
                  <input style={{...iBase,flex:1}} value={state.theme.ac1} onChange={e=>set({theme:{...state.theme,ac1:e.target.value}})} placeholder="#4f46e5" mono/>
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:T.t4,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:5}}>Accent End</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <input type="color" value={state.theme.ac2} onChange={e=>set({theme:{...state.theme,ac2:e.target.value}})} style={{width:36,height:28,border:`1px solid ${T.border}`,borderRadius:5,background:"none",cursor:"pointer",padding:2}}/>
                  <input style={{...iBase,flex:1}} value={state.theme.ac2} onChange={e=>set({theme:{...state.theme,ac2:e.target.value}})} placeholder="#0891b2" mono/>
                </div>
              </div>
            </div>
            <div style={{height:8,borderRadius:4,background:`linear-gradient(90deg,${state.theme.ac1},${state.theme.ac2})`,marginBottom:10}}/>
            <div style={{fontSize:10,color:T.t5,fontWeight:300}}>These colors apply to buttons, gradients, and accents throughout the email.</div>
          </Accordion>

        </div>

        {/* ── PREVIEW ── */}
        <div className="preview-pane" style={{flex:1,overflowY:"auto",padding:"24px 20px 60px",background:`radial-gradient(ellipse at 20% 10%,rgba(79,70,229,.05) 0%,transparent 55%),${T.bg0}`,flexDirection:"column",alignItems:"center",display:mobileTab==="editor"?"none":"flex"}}>
          <style>{`.preview-pane::-webkit-scrollbar{width:4px}.preview-pane::-webkit-scrollbar-thumb{background:rgba(99,102,241,.15);border-radius:2px}`}</style>
          {/* Subject preview bar */}
          {state.meta.subject&&<div style={{width:"100%",maxWidth:pw,marginBottom:10,background:"rgba(10,10,20,.8)",border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 14px",display:"flex",gap:8,alignItems:"baseline"}}>
            <span style={{fontSize:9,fontWeight:700,color:T.t5,letterSpacing:".12em",textTransform:"uppercase",flexShrink:0}}>Subject</span>
            <span style={{fontSize:12,color:T.t2,fontWeight:600}}>{state.meta.subject}</span>
            {state.meta.previewText&&<span style={{fontSize:11,color:T.t4,fontWeight:300,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>· {state.meta.previewText}</span>}
          </div>}
          {/* Mobile frame */}
          {previewMode==="mobile"&&<div style={{width:375,background:"#1a1a2e",borderRadius:40,padding:"12px 6px",border:"2px solid rgba(99,102,241,.2)",boxShadow:"0 0 40px rgba(0,0,0,.5)",marginBottom:8}}>
            <div style={{height:8,background:"rgba(99,102,241,.15)",borderRadius:4,width:100,margin:"0 auto 10px"}}/>
            <div style={{overflowY:"auto",maxHeight:600,borderRadius:28,}}><EmailPreview state={state} width={363}/></div>
          </div>}
          {previewMode==="desktop"&&<div style={{width:"100%",maxWidth:pw}}><EmailPreview state={state} width="100%"/></div>}
          <div style={{marginTop:12,fontSize:9,color:T.t5,letterSpacing:".12em",textTransform:"uppercase",textAlign:"center"}}>{state.blocks.filter(b=>b.visible).length} visible blocks · {previewMode} view</div>
        </div>

      </div>
    </div>
  );
}
