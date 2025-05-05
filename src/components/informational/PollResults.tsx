import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from "chart.js";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import colors from "tailwindcss/colors";

import H2 from "@/components/typography/H2";
import { CHART_COLORS, CHART_HOVER_COLORS, CHART_PLUGINS } from "@/const/chart";
import illustration from "@/public/undraw_no_data_re_kwbl.svg";
import type { Poll, PollResult } from "@/types/poll";

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "Jost";
Chart.register(LinearScale, BarController, CategoryScale, BarElement, Tooltip);
export default function PollResults({ poll, results }: { poll: Poll; results: PollResult }) {
    const chartRef = useRef(null);
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: "bar",
                data: {
                    labels: results.options,
                    datasets: [
                        {
                            label: "Poll Results",
                            data: results.results,
                            backgroundColor: CHART_COLORS,
                            hoverBackgroundColor: CHART_HOVER_COLORS,
                            borderRadius: 75 / results.options.length,
                        },
                    ],
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
                                color: resolvedTheme === "dark" ? colors.neutral["700"] : colors.neutral["300"],
                                drawTicks: false,
                            },
                            border: {
                                display: false,
                            },
                        },
                        x: {
                            ticks: {
                                color: resolvedTheme === "dark" ? "white" : "black",
                                callback(i) {
                                    const index = i as number;
                                    const label = results.options[index];
                                    const maxLength = 10 + index;
                                    if ((i as number) > 2 || label.length <= maxLength) return label;
                                    return `${label.slice(0, maxLength).trim()}…`;
                                },
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: CHART_PLUGINS,
                },
            });
            return () => chart.destroy();
        }
    }, [resolvedTheme, results.options, results.results]);

    const noVotes = (
        <div className="my-24 flex flex-col items-center">
            <H2>Waiting for the first vote</H2>
            <Image src={illustration} alt="" draggable={false} priority className="mt-8 h-auto w-1/2 max-w-60" />
        </div>
    );

    const pollResults = (
        <>
            <div className="relative h-[20dvw] max-h-[50dvh] min-h-48 w-full">
                <canvas ref={chartRef} aria-label="Poll result bar chart" role="img" data-test-id="poll-result-chart">
                    <ul>
                        {results.options.map((x, i) => (
                            <li key={i}>
                                {x}: {results.results[i]}
                            </li>
                        ))}
                    </ul>
                </canvas>
            </div>
            {poll.winnerNeedsMajority && (
                <span className="mt-6 block">
                    Note: the winner of this poll needs a majority (more than half of possible points).
                </span>
            )}
        </>
    );

    const pollResultInfo = (
        <div className="shadow-3d-inset dark:shadow-dark-3d-inset mb-8 rounded-2xl px-4 py-8 sm:flex sm:px-0">
            <div className="flex items-center px-6 sm:w-1/3 sm:flex-col sm:justify-center">
                <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">Voters</span>
                <span className="text-center">{results.voterCount}</span>
            </div>
            <div className="my-4 flex items-center text-ellipsis border-neutral-300 px-6 sm:my-0 sm:w-1/3 sm:flex-col sm:justify-center sm:border-x-2 dark:border-neutral-700">
                <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">
                    Winner{results.winners.length !== 1 && "s"}
                </span>
                <span className="break-words text-center sm:w-full" data-test-id="winners">
                    {results.winners.length === 0 ? "None" : results.winners.map(x => results.options[x]).join(", ")}
                </span>
            </div>
            <div className="flex items-center px-6 sm:w-1/3 sm:flex-col sm:justify-center">
                <span className="font-bold uppercase after:mr-1 after:content-[':'] sm:after:content-none">
                    Choices
                </span>
                <span className="text-center">{results.options.length}</span>
            </div>
        </div>
    );

    return (
        <section className="my-16">
            {pollResultInfo}
            {results.voterCount === 0 ? noVotes : pollResults}
        </section>
    );
}
