import plugin from "tailwindcss/plugin";

type Direction = "left" | "right" | "top" | "bottom";
type CssVarKey = `--tw-mask-${Direction}`;
type MaskVars = Partial<Record<CssVarKey, string>>;

export function mask(): ReturnType<typeof plugin> {
  const directions: Direction[] = ["left", "right", "top", "bottom"];
  const opposites: Record<Direction, Direction> = { top: "bottom", bottom: "top", left: "right", right: "left" };

  const gradients = directions
    .map(direction => {
      return `linear-gradient(to ${opposites[direction]}, transparent, black var(--tw-mask-${direction}, 0), black 100%)`;
    })
    .join(",");

  function masks(...directions: Direction[]): (value: string) => MaskVars {
    return value => {
      const rules: MaskVars = {};
      for (const dir of directions) rules[`--tw-mask-${dir}`] = value;
      return rules;
    };
  }

  return plugin(({ addUtilities, theme, matchUtilities }) => {
    matchUtilities(
      {
        "mask-t": masks("top"),
        "mask-b": masks("bottom"),
        "mask-l": masks("left"),
        "mask-r": masks("right"),
        "mask-tl": masks("top", "left"),
        "mask-tr": masks("top", "right"),
        "mask-bl": masks("bottom", "left"),
        "mask-br": masks("bottom", "right"),
        "mask-x": masks("left", "right"),
        "mask-y": masks("top", "bottom"),
        mask: masks("top", "left", "bottom", "right"),
      },
      {
        values: theme("spacing"),
      },
    );

    addUtilities({
      ".mask-none": { "mask-image": "none" },
      ".mask": { "mask-image": gradients, "mask-composite": "intersect" },
    });
  });
}
