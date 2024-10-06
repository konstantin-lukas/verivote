import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const origin = process.env.ORIGIN ?? "localhost:3000";
    return [
        {
            url: origin,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 1,
        }, {
            url: origin + "/approval-voting",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        }, {
            url: origin + "/instant-runoff-voting",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.9,
        }, {
            url: origin + "/plurality-voting",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        }, {
            url: origin + "/positional-voting",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        }, {
            url: origin + "/score-voting",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        },
    ];
}