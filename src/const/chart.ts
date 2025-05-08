import type { TooltipItem } from "chart.js";
import colors from "tailwindcss/colors";

export const CHART_COLORS = [
    colors.cyan["500"],
    colors.rose["500"],
    colors.teal["500"],
    colors.pink["500"],
    colors.emerald["500"],
    colors.fuchsia["500"],
    colors.green["500"],
    colors.purple["500"],
    colors.lime["500"],
    colors.violet["500"],
    colors.yellow["500"],
    colors.indigo["500"],
    colors.amber["500"],
    colors.blue["500"],
    colors.orange["500"],
    colors.sky["500"],
    colors.red["500"],
];

export const CHART_HOVER_COLORS = [
    colors.cyan["400"],
    colors.rose["400"],
    colors.teal["400"],
    colors.pink["400"],
    colors.emerald["400"],
    colors.fuchsia["400"],
    colors.green["400"],
    colors.purple["400"],
    colors.lime["400"],
    colors.violet["400"],
    colors.yellow["400"],
    colors.indigo["400"],
    colors.amber["400"],
    colors.blue["400"],
    colors.orange["400"],
    colors.sky["400"],
    colors.red["400"],
];

export const CHART_PLUGINS = {
    tooltip: {
        cornerRadius: 15,
        padding: {
            x: 20,
            y: 15,
        },
        callbacks: {
            label: (context: TooltipItem<"bar">) => {
                const parsed = window.innerWidth < 640 ? context.parsed.x : context.parsed.y;
                return `${parsed} point${parsed !== 0 && "s"}`;
            },
        },
        displayColors: false,
    },
};
