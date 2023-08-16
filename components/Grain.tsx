function Grain() {
  return (
    <svg
      className="pointer-events-none fixed isolate z-50 opacity-10 mix-blend-soft-light"
      width="100%"
      height="100%"
    >
      <filter id="lmao">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.80"
          numOctaves="4"
          stitchTiles="stitch"
        ></feTurbulence>
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#lmao)"
      ></rect>
    </svg>
  );
}

export default Grain;
