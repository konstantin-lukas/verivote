import { addDays } from "date-fns";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { VotingMethod } from "@/enum/poll";

dotenv.config({ path: ".env", override: true });

function getRandomVotingMethod() {
    const enumValues = Object.values(VotingMethod).filter(value => typeof value === "number");
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

const username = encodeURIComponent(process.env.MONGODB_USER!);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const connection = encodeURIComponent(process.env.MONGODB_DATABASE!);
const uri = `mongodb://${username}:${password}@${process.env.MONGODB_URI!}/${connection}?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

const db = client.db("verivote");
const polls = db.collection("polls");

const pollFixtures = [
    {
        title: "What should we have for dinner?",
        options: ["Spaghetti", "Sushi", "Curry", "Borscht", "Tacos"],
    },
    {
        title: "Where should we go for vacation?",
        options: ["Beach", "Mountains", "City", "Countryside", "Desert"],
    },
    {
        title: "Which movie should we watch this weekend?",
        options: ["Inception", "The Matrix", "Interstellar", "Parasite", "The Grand Budapest Hotel"],
    },
    {
        title: "What genre of music should we play at the party?",
        options: ["Pop", "Rock", "Jazz", "Hip Hop", "Classical"],
    },
    {
        title: "Which sport should we play this weekend?",
        options: ["Soccer", "Basketball", "Tennis", "Volleyball", "Cricket"],
    },
    {
        title: "Which book should we read next in the book club?",
        options: ["1984", "To Kill a Mockingbird", "The Great Gatsby", "Pride and Prejudice", "Moby Dick"],
    },
    {
        title: "What type of cuisine should we try next?",
        options: ["Italian", "Chinese", "Indian", "Mexican", "Greek"],
    },
    {
        title: "Which video game should we play for the tournament?",
        options: ["FIFA", "Call of Duty", "Fortnite", "Minecraft", "Mario Kart"],
    },
    {
        title: "What should be the theme for our next event?",
        options: ["80s Retro", "Masquerade", "Beach Party", "Halloween", "Formal Gala"],
    },
    {
        title: "What kind of workout should we try together?",
        options: ["Yoga", "HIIT", "Pilates", "Running", "Cycling"],
    },
];

(async () => {
    await polls.deleteMany({});
    await polls.insertMany(
        pollFixtures.map(fixture => ({
            creationTime: new Date(),
            closingTime: addDays(new Date(), Math.floor(Math.random() * 10) + 1),
            title: fixture.title,
            options: fixture.options,
            userIdentifier: process.env.FIXTURE_USER_IDENTIFIER,
            winnerNeedsMajority: true,
            votingMethod: getRandomVotingMethod(),
        })),
    );
    await client.close();
})();
