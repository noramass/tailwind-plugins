import plugin from "tailwindcss/plugin";

type DockRules = { [Key in "top" | "left" | "right" | "bottom"]?: string } & { position: "absolute" };

export function index(): ReturnType<typeof plugin> {
  return plugin(({ addUtilities, theme }) => {
    function docks([spacing, value]: [spacing: string, value: string]) {
      return Object.fromEntries(
        ["t", "b", "l", "r", "tl", "tr", "bl", "br", "x", "y", "full"].map((dir) => {
          const rules: DockRules = { position: "absolute" };

          if (dir.includes("t") || dir.includes("y")) rules.top = value;
          if (dir.includes("b") || dir.includes("y")) rules.bottom = value;
          if (dir.includes("l") || dir.includes("x")) rules.left = value;
          if (dir.includes("r") || dir.includes("x")) rules.right = value;
          if (dir === "full") rules.top = rules.bottom = rules.left = rules.right = value;

          return [`.dock-${dir}${spacing === "0" ? "" : `-${spacing}`}`, rules];
        }),
      );
    }

    addUtilities(
      Object.entries(theme("spacing")!)
        .map(docks)
        .reduce((a, b) => Object.assign(a, b), {}),
    );
  });
}
