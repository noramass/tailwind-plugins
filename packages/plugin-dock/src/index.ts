import plugin from "tailwindcss/plugin";

type Direction = "left" | "right" | "top" | "bottom";
type DockRules = { [Key in Direction]?: string } & { position: "absolute" };

export function index(): ReturnType<typeof plugin> {
  function docks(...directions: Direction[]): (value: string) => DockRules {
    return value => {
      const rules: DockRules = { position: "absolute" };
      for (const dir of directions) rules[dir] = value;
      return rules;
    };
  }

  return plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "dock-t": docks("top"),
        "dock-b": docks("bottom"),
        "dock-l": docks("left"),
        "dock-r": docks("right"),
        "dock-tl": docks("top", "left"),
        "dock-tr": docks("top", "right"),
        "dock-bl": docks("bottom", "left"),
        "dock-br": docks("bottom", "right"),
        "dock-x": docks("left", "right"),
        "dock-y": docks("top", "bottom"),
        dock: docks("top", "left", "bottom", "right"),
      },
      { values: theme("spacing") },
    );
  });
}
