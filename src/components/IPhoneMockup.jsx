export default function IPhoneMockup({ children, statusBarColor = "#000" }) {
  return (
    <div style={{
      position: "relative",
      width: 390,
      height: 844,
      background: "#1a1a1a",
      borderRadius: 50,
      boxShadow: "0 0 0 2px #3a3a3a, 0 0 0 4px #222, 0 30px 80px rgba(0,0,0,0.6)",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Volume buttons left */}
      <div style={{ position: "absolute", left: -4, top: 130, width: 4, height: 34, background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 176, width: 4, height: 64, background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 252, width: 4, height: 64, background: "#3a3a3a", borderRadius: "2px 0 0 2px" }} />
      {/* Power button right */}
      <div style={{ position: "absolute", right: -4, top: 196, width: 4, height: 80, background: "#3a3a3a", borderRadius: "0 2px 2px 0" }} />

      {/* Screen */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: statusBarColor,
        borderRadius: 50,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 34,
          background: "#000",
          borderRadius: 20,
          zIndex: 10,
        }} />

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: 50, borderRadius: 50, overflow: "hidden" }}>
          {children}
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 130,
          height: 5,
          background: "rgba(255,255,255,0.3)",
          borderRadius: 3,
          zIndex: 10,
        }} />
      </div>
    </div>
  )
}
