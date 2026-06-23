"use client";

const PURPLE = "#534AB7";
const DARK_PURPLE = "#26215C";

const style = `
  @keyframes flip0 {
    0%   { transform: rotateY(0deg); }
    40%  { transform: rotateY(-90deg); }
    80%  { transform: rotateY(-180deg); }
    100% { transform: rotateY(-180deg); }
  }
  @keyframes flip1 {
    0%   { transform: rotateY(0deg); }
    40%  { transform: rotateY(-90deg); }
    80%  { transform: rotateY(-180deg); }
    100% { transform: rotateY(-180deg); }
  }
  @keyframes flip2 {
    0%   { transform: rotateY(0deg); }
    40%  { transform: rotateY(-90deg); }
    80%  { transform: rotateY(-180deg); }
    100% { transform: rotateY(-180deg); }
  }
  @keyframes flip3 {
    0%   { transform: rotateY(0deg); }
    40%  { transform: rotateY(-90deg); }
    80%  { transform: rotateY(-180deg); }
    100% { transform: rotateY(-180deg); }
  }
  .page-0 { animation: flip0 2.4s ease-in-out infinite 0s; }
  .page-1 { animation: flip1 2.4s ease-in-out infinite 0.5s; }
  .page-2 { animation: flip2 2.4s ease-in-out infinite 1.0s; }
  .page-3 { animation: flip3 2.4s ease-in-out infinite 1.5s; }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes progressBar {
    0%   { width: 0%;   opacity: 1; }
    80%  { width: 100%; opacity: 1; }
    100% { width: 100%; opacity: 0; }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1.2); }
  }
`;

export default function Loading() {
  return (
    <>
      <style>{style}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "clamp(16px, 3vw, 28px)",
          padding: "2rem",
          fontFamily: "sans-serif",
          perspective: "1000px",
        }}
      >
        {/* Book */}
        <div
          style={{
            width: "clamp(100px, 20vw, 160px)",
            height: "clamp(130px, 26vw, 200px)",
            position: "relative",
            perspective: "800px",
          }}
        >
          {/* Left cover */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              borderRadius: "4px 0 0 4px",
              background: `linear-gradient(135deg, ${PURPLE} 0%, #3C3489 100%)`,
              zIndex: 1,
            }}
          />
          {/* Right cover */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              borderRadius: "0 4px 4px 0",
              background: `linear-gradient(135deg, #3C3489 0%, ${DARK_PURPLE} 100%)`,
              zIndex: 1,
            }}
          />
          {/* Spine */}
          <div
            style={{
              position: "absolute",
              left: "calc(50% - 4px)",
              top: 0,
              width: "8px",
              height: "100%",
              background: DARK_PURPLE,
              zIndex: 20,
              borderRadius: "2px",
            }}
          />

          {/* Pages */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`page-${i}`}
              style={{
                position: "absolute",
                top: "4px",
                left: "50%",
                width: "calc(50% - 6px)",
                height: "calc(100% - 8px)",
                background: "#f8f6f0",
                borderRadius: "0 3px 3px 0",
                transformOrigin: "left center",
                zIndex: 10 - i,
                boxShadow: "inset -2px 0 4px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                <div
                  key={line}
                  style={{
                    position: "absolute",
                    top: `calc(10% + ${line * 11}%)`,
                    left: "12%",
                    right: "12%",
                    height: "1px",
                    background: `rgba(83,74,183,${0.14 - line * 0.012})`,
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Logo */}
        <h1
          style={{
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.5px",
            margin: 0,
            display: "flex",
            alignItems: "baseline",
            animation: "pulse 2.4s ease-in-out infinite",
          }}
        >
          <span style={{ color: PURPLE }}>Ink</span>
          <span style={{ opacity: 0.85 }}>Sphere</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(13px, 2.5vw, 15px)",
            color: "#6b7280",
            margin: 0,
            textAlign: "center",
            maxWidth: "260px",
            lineHeight: 1.5,
            animation: "pulse 2.4s ease-in-out infinite",
          }}
        >
          Preparing a world of stories for you...
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "clamp(160px, 40vw, 240px)",
            height: "3px",
            background: "#e5e7eb",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "99px",
              background: PURPLE,
              animation: "progressBar 2.4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: PURPLE,
                animation: `dotPulse 2.4s ease-in-out infinite ${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}