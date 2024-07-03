import plugin from "tailwindcss/plugin";

type Direction = "left" | "right" | "top" | "bottom";
type CssVarKey = `--tw-mask-${Direction}`;
type MaskVars = Partial<Record<CssVarKey, string>>;

export function mask(): ReturnType<typeof plugin> {
  const directions: Direction[] = ["left", "right", "top", "bottom"];
  const opposites: Record<Direction, Direction> = { top: "bottom", bottom: "top", left: "right", right: "left" };

  const gradients = directions
    .map((direction) => {
      return `linear-gradient(to ${opposites[direction]}, transparent, black var(--tw-mask-${direction}, 0), black 100%)`;
    })
    .join(",");

  function masks([spacing, value]: [spacing: string, value: string]) {
    return Object.fromEntries(
      ["t", "b", "l", "r", "tl", "tr", "bl", "br", "h", "w", "full"].map((dir) => {
        const rules: MaskVars = {};

        if (dir.includes("t") || dir.includes("h")) rules["--tw-mask-top"] = value;
        if (dir.includes("b") || dir.includes("h")) rules["--tw-mask-bottom"] = value;
        if (dir.includes("l") || dir.includes("w")) rules["--tw-mask-left"] = value;
        if (dir.includes("r") || dir.includes("w")) rules["--tw-mask-right"] = value;
        if (dir === "full")
          rules["--tw-mask-top"] =
            rules["--tw-mask-bottom"] =
            rules["--tw-mask-left"] =
            rules["--tw-mask-right"] =
              value;

        return [`.mask-${dir}${spacing === "0" ? "" : `-${spacing}`}`, rules];
      }),
    );
  }

  return plugin(({ addUtilities, theme }) => {
    const generatedMasks = Object.entries(theme("spacing")!)
      .map(masks)
      .reduce((a, b) => Object.assign(a, b));

    addUtilities({
      ".mask": { "mask-image": gradients, "mask-composite": "intersect" },
      ...generatedMasks,
    });
  });
}
