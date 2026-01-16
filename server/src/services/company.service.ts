export const generateKey = (name: string) => {
  const first = (name || "").trim().split(/\s+/)[0] || "company";
  const normalized = first.toLowerCase().replace(/[^a-z0-9]/g, "");

  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const makeSegment = () => {
    let s = "";
    for (let i = 0; i < 4; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // ensure at least one digit and at least one letter
    if (!/[0-9]/.test(s)) {
      const idx = Math.floor(Math.random() * 4);
      s = s.substring(0, idx) + "0" + s.substring(idx + 1);
    }
    if (!/[a-z]/.test(s)) {
      const idx = Math.floor(Math.random() * 4);
      s = s.substring(0, idx) + "a" + s.substring(idx + 1);
    }
    return s;
  };

  return `${normalized}-${makeSegment()}`;
};
