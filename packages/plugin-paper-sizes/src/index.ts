import plugin from "tailwindcss/plugin";

type PaperDimensions = [width: string, height: string];
type PaperSizes = Record<string, PaperDimensions>;

export function paper(sizes: PaperSizes): ReturnType<typeof plugin> {
  const portraitWidths: Record<string, string> = {};
  const portraitHeights: Record<string, string> = {};
  const landscapeWidths: Record<string, string> = {};
  const landscapeHeights: Record<string, string> = {};

  Object.entries(sizes).forEach(([format, [width, height]]) => {
    portraitWidths[format] = width;
    portraitHeights[format] = height;
    landscapeWidths[`${format}-landscape`] = height;
    landscapeHeights[`${format}-landscape`] = width;
  });

  const widths = { ...portraitWidths, ...landscapeWidths };
  const heights = { ...portraitHeights, ...landscapeHeights };

  return plugin(({ theme, addUtilities }) => {
    for (const [size, value] of Object.entries(widths)) {
      addUtilities({
        [`.w-${size}`]: { width: value },
        [`min-w-${size}`]: { "min-width": value },
        [`max-w-${size}`]: { "max-width": value },
      });
    }

    for (const [size, value] of Object.entries(heights)) {
      addUtilities({
        [`.h-${size}`]: { height: value },
        [`min-h-${size}`]: { "min-height": value },
        [`max-h-${size}`]: { "max-height": value },
      });
    }
  });
}

export function metricPaper(): ReturnType<typeof plugin> {
  return paper({
    a0: ["841mm", "1189mm"],
    a1: ["594mm", "841mm"],
    a2: ["420mm", "594mm"],
    a3: ["297mm", "420mm"],
    a4: ["210mm", "297mm"],
    a5: ["148mm", "210mm"],
    a6: ["105mm", "148mm"],
    a7: ["74mm", "105mm"],
    a8: ["52mm", "74mm"],
    a9: ["37mm", "52mm"],
  });
}

export function usLetterPaper(): ReturnType<typeof plugin> {
  return paper({
    "half-letter": ["5.5in", "8.5in"],
    "government-letter": ["8in", "10in"],
    letter: ["8.5in", "11in"],
    "junior-legal": ["5in", "8in"],
    "government-legal": ["8.5in", "13in"],
    legal: ["8.5in", "14in"],
    ledger: ["11in", "17in"],
    "ansi-a": ["8.5in", "11in"],
    "ansi-b": ["11in", "17in"],
    "ansi-c": ["17in", "22in"],
    "ansi-d": ["22in", "34in"],
    "ansi-e": ["34in", "44in"],
    "b-plus": ["13in", "19in"],
    "arch-a": ["9in", "12in"],
    "arch-b": ["12in", "18in"],
    "arch-c": ["18in", "24in"],
    "arch-d": ["24in", "36in"],
    "arch-e": ["36in", "48in"],
    "arch-e1": ["30in", "42in"],
  });
}
