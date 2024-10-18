import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from "chart.js";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "@/tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
import type { Poll, PollSummary } from "@/data/types";
Chart.defaults.font.size = 16;
Chart.defaults.font.family = "Jost";
Chart.register(LinearScale, BarController, CategoryScale, BarElement, Tooltip);
export default function PollResults({ poll, results }: { poll: Poll, results: PollSummary }) {
    const chartRef = useRef(null);
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: "bar",
                data: {
                    labels: results.options,
                    datasets: [{
                        label: "My First Dataset",
                        data: results.results,
                        backgroundColor: [
                            fullConfig.theme.colors.cyan["500"],
                            fullConfig.theme.colors.rose["500"],
                            fullConfig.theme.colors.teal["500"],
                            fullConfig.theme.colors.pink["500"],
                            fullConfig.theme.colors.emerald["500"],
                            fullConfig.theme.colors.fuchsia["500"],
                            fullConfig.theme.colors.green["500"],
                            fullConfig.theme.colors.purple["500"],
                            fullConfig.theme.colors.lime["500"],
                            fullConfig.theme.colors.violet["500"],
                            fullConfig.theme.colors.yellow["500"],
                            fullConfig.theme.colors.indigo["500"],
                            fullConfig.theme.colors.amber["500"],
                            fullConfig.theme.colors.blue["500"],
                            fullConfig.theme.colors.orange["500"],
                            fullConfig.theme.colors.sky["500"],
                            fullConfig.theme.colors.red["500"],
                        ],
                        hoverBackgroundColor: [
                            fullConfig.theme.colors.cyan["400"],
                            fullConfig.theme.colors.rose["400"],
                            fullConfig.theme.colors.teal["400"],
                            fullConfig.theme.colors.pink["400"],
                            fullConfig.theme.colors.emerald["400"],
                            fullConfig.theme.colors.fuchsia["400"],
                            fullConfig.theme.colors.green["400"],
                            fullConfig.theme.colors.purple["400"],
                            fullConfig.theme.colors.lime["400"],
                            fullConfig.theme.colors.violet["400"],
                            fullConfig.theme.colors.yellow["400"],
                            fullConfig.theme.colors.indigo["400"],
                            fullConfig.theme.colors.amber["400"],
                            fullConfig.theme.colors.blue["400"],
                            fullConfig.theme.colors.orange["400"],
                            fullConfig.theme.colors.sky["400"],
                            fullConfig.theme.colors.red["400"],
                        ],
                        borderRadius: 75 / results.options.length,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: "nearest",
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                                color: resolvedTheme === "dark" ? "white" : "black",
                                padding: 10,
                            },
                            grid: {
                                color: resolvedTheme === "dark"
                                    ? fullConfig.theme.colors.neutral["700"]
                                    : fullConfig.theme.colors.neutral["300"],
                                drawTicks: false,
                            },
                            border: {
                                display: false,
                            },
                        },
                        x: {
                            ticks: {
                                color: resolvedTheme === "dark" ? "white" : "black",
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            cornerRadius: 15,
                            padding: {
                                x: 20,
                                y: 15,
                            },
                            callbacks: {
                                label: (context) => context.parsed.y + " point" + (context.parsed.y !== 0 && "s"),
                            },
                            displayColors: false,
                        },
                    },
                },
            });
            return () => chart.destroy();
        }
    }, [results.options, results.results, resolvedTheme]);
    return (
        <section className="my-16">
            <div className="mb-8 rounded-2xl px-4 py-8 shadow-3d-inset sm:flex sm:px-0 dark:shadow-dark-3d-inset">
                <div className="flex items-center px-6 sm:w-1/3 sm:flex-col sm:justify-center">
                    <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">Voters</span>
                    <span className="text-center">{results.voterCount}</span>
                </div>
                <div
                    className="my-4 flex items-center text-ellipsis border-neutral-300 px-6 sm:my-0 sm:w-1/3 sm:flex-col
                    sm:justify-center sm:border-x-2 dark:border-neutral-700"
                >
                    <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">Winner{results.winners.length !== 1 && "s"}</span>
                    <span className="break-words text-center sm:w-full">
                        {results.winners.length === 0 ? "None" : results.winners.map(x => results.options[x]).join(", ")}
                    </span>
                </div>
                <div className="flex items-center px-6 sm:w-1/3 sm:flex-col sm:justify-center">
                    <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">Choices</span>
                    <span className="text-center">{results.options.length}</span>
                </div>
            </div>
            <div className="relative h-[20dvw] max-h-[50dvh] min-h-48 w-full">
                <canvas ref={chartRef} aria-label="Poll result bar chart" role="img">
                    <ul>
                        {results.options.map((x, i) => <li key={i}>{x}: {results.results[i]}</li>)}
                    </ul>
                </canvas>
            </div>
            {poll.majority && <span className="mt-6 block">Note: the winner of this poll needs a majority.</span>}
        </section>
    );
}