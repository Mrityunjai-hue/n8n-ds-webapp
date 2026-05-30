const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800;900&display=swap');

  .n8n-wrap {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    user-select: none;
  }

  .n8n-wrap.stacked {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .n8n-wordmark {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .n8n-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 900;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .n8n-name .n-char {
    color: #ffffff;
  }

  .n8n-name .eight-char {
    background: linear-gradient(135deg, #6366f1, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .n8n-tagline {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 7px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #64748b;
    white-space: nowrap;
  }

  .n8n-dot-flow {
    animation: dotFlow 1.8s ease-in-out infinite;
  }

  @keyframes dotFlow {
    0%   { offset-distance: 0%;   opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
  }
`;

// Variant configs
const SIZES = {
  navbar:  { iconH: 28, fontSize: "17px" },
  default: { iconH: 36, fontSize: "20px" },
  stacked: { iconH: 52, fontSize: "24px" },
  icon:    { iconH: 48, fontSize: null },
} as const;

interface N8NLogoProps {
  variant?: keyof typeof SIZES;
  mono?: boolean;
  animated?: boolean;
  href?: string;
  className?: string;
}

export default function N8NLogo({
  variant = "default",
  mono = false,
  animated = true,
  href,
  className = "",
}: N8NLogoProps) {
  const cfg = SIZES[variant] || SIZES.default;
  const isStacked = variant === "stacked";
  const isIconOnly = variant === "icon";

  // Colors
  const leftNodeFill  = mono ? "#ffffff" : "#6366f1";
  const rightNodeFill = mono ? "#ffffff" : "#22d3ee";
  const nodeTextFill  = mono ? "#000000" : "#ffffff";
  const dotColor      = mono ? "#ffffff" : "#ffffff";

  // The 8 pipeline node colors (indigo → cyan gradient)
  const pipeColors = mono
    ? Array(8).fill("#ffffff")
    : ["#6366f1","#818cf8","#a78bfa","#c084fc","#e879f9","#f0abfc","#67e8f9","#22d3ee"];

  // SVG dimensions scale with iconH
  const H = cfg.iconH;
  const W = H * 1.8;  // aspect ratio
  const nodeW = H * 0.44;
  const nodeH = H * 0.86;
  const nodeRx = H * 0.13;
  const nodeFontSize = H * 0.38;

  const leftX  = 0;
  const rightX = W - nodeW;
  const midY   = H / 2;

  // Left node center-right edge and right node center-left edge
  const startX = nodeW;
  const endX   = rightX;

  // 8 small dots in a gentle S-curve between startX and endX
  const dots = Array.from({ length: 8 }, (_, i) => {
    const t = (i + 1) / 9; // evenly spaced
    const x = startX + t * (endX - startX);
    // sine wave offset: ±(H*0.15)
    const y = midY + Math.sin(t * Math.PI * 2) * (H * 0.14);
    return { x, y, color: pipeColors[i] };
  });

  // Path for the animated flow dot: cubic bezier through S-curve
  const cpX = (startX + endX) / 2;
  const flowPath = `M ${startX} ${midY} C ${cpX} ${midY - H * 0.25}, ${cpX} ${midY + H * 0.25}, ${endX} ${midY}`;

  // Connecting line segments between nodes
  const allPoints = [
    { x: startX, y: midY },
    ...dots,
    { x: endX, y: midY },
  ];

  const Tag = href ? "a" : "div";
  const tagProps = href ? { href, "aria-label": "N8N Data Science Community" } : {};

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Tag
        {...tagProps}
        className={`n8n-wrap${isStacked ? " stacked" : ""} ${className}`}
      >
        {/* Icon mark */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <defs>
            <linearGradient id="n8n-pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={mono ? "#ffffff" : "#6366f1"} />
              <stop offset="100%" stopColor={mono ? "#ffffff" : "#22d3ee"} />
            </linearGradient>
          </defs>

          {/* Connection line segments */}
          {allPoints.slice(0, -1).map((pt, i) => (
            <line
              key={i}
              x1={pt.x} y1={pt.y}
              x2={allPoints[i + 1].x} y2={allPoints[i + 1].y}
              stroke="url(#n8n-pipe-grad)"
              strokeWidth="1"
              opacity={mono ? 0.5 : 0.4}
            />
          ))}

          {/* Animated flow dot */}
          {animated && (
            <circle r="2.5" fill={dotColor} opacity="0.9">
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                path={flowPath}
              />
            </circle>
          )}

          {/* Pipeline nodes (8 dots) */}
          {dots.map((dot, i) => (
            <g key={i}>
              {/* Glow */}
              <circle cx={dot.x} cy={dot.y} r="5" fill={dot.color} opacity="0.15" />
              {/* Core */}
              <circle cx={dot.x} cy={dot.y} r="2.5" fill={dot.color} opacity="0.9" />
            </g>
          ))}

          {/* Left N node */}
          <rect
            x={leftX} y={(H - nodeH) / 2}
            width={nodeW} height={nodeH}
            rx={nodeRx}
            fill={leftNodeFill}
          />
          <text
            x={leftX + nodeW / 2}
            y={midY + nodeFontSize * 0.36}
            textAnchor="middle"
            fill={nodeTextFill}
            fontSize={nodeFontSize}
            fontWeight="800"
            fontFamily="'Space Grotesk', sans-serif"
          >
            N
          </text>

          {/* Right N node */}
          <rect
            x={rightX} y={(H - nodeH) / 2}
            width={nodeW} height={nodeH}
            rx={nodeRx}
            fill={rightNodeFill}
          />
          <text
            x={rightX + nodeW / 2}
            y={midY + nodeFontSize * 0.36}
            textAnchor="middle"
            fill={nodeTextFill}
            fontSize={nodeFontSize}
            fontWeight="800"
            fontFamily="'Space Grotesk', sans-serif"
          >
            N
          </text>
        </svg>

        {/* Wordmark — hidden for icon-only variant */}
        {!isIconOnly && (
          <div className="n8n-wordmark">
            <span className="n8n-name" style={{ fontSize: cfg.fontSize || undefined }}>
              <span className="n-char">N</span>
              <span className="eight-char">8</span>
              <span className="n-char">N</span>
            </span>
            <span className="n8n-tagline">Data Science Community</span>
          </div>
        )}
      </Tag>
    </>
  );
}
