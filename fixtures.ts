import { VotingMethod } from "@/enum/poll";

export const POLL_FIXTURES = [
    {
        id: "a3f9b7c2e4d8a1f5c9b60213",
        title: "What should we have for dinner?",
        options: [
            "Spaghetti",
            "Sushi",
            "Curry",
            "Borscht",
            "Tacos",
            "Paella",
            "Dumplings",
            "Ramen",
            "Falafel",
            "Moussaka",
            "Pho",
            "Kimchi",
            "Goulash",
            "Empanadas",
            "Jollof Rice",
            "Pad Thai",
            "Shawarma",
            "Pierogi",
            "Ceviche",
            "Chicken Tikka Masala",
        ],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.INSTANT_RUNOFF_VOTING,
        hasLocalhostVoted: false,
        voteCount: 0,
    },
    {
        id: "5f27d8c4a9b13e07c6d4a293",
        title: "Where should we go for vacation?",
        options: ["Beach", "Mountains", "City", "Countryside", "Desert"],
        winnerNeedsMajority: true,
        votingMethod: VotingMethod.INSTANT_RUNOFF_VOTING,
        hasLocalhostVoted: true,
        voteCount: 12,
    },
    {
        id: "c49a2e6f3d7b9a0e58f2c1a3",
        title: "Which game should we play?",
        options: [
            "I'm on Observation Duty 1-7",
            "Lethal Company",
            "Dead By Daylight",
            "Rocket League",
            "Gartic Phone",
            "Amogus",
            "Scribble",
        ],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.APPROVAL_VOTING,
        hasLocalhostVoted: true,
        voteCount: 10,
    },
    {
        id: "e78c3f129ab456de9c204a78",
        title: "Which movie should we watch this weekend?",
        options: ["Inception", "The Matrix", "Interstellar", "Parasite", "The Grand Budapest Hotel"],
        winnerNeedsMajority: true,
        votingMethod: VotingMethod.APPROVAL_VOTING,
        hasLocalhostVoted: false,
        voteCount: 0,
    },
    {
        id: "0d3f1c9a87b2e4d05c39f1ae",
        title: "What genre of music should we play at the party?",
        options: ["Pop", "Rock", "Jazz", "Hip Hop", "Classical"],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.SCORE_VOTING,
        hasLocalhostVoted: true,
        voteCount: 19,
    },
    {
        id: "9f13b7a5d60c2e8b374da0fc",
        title: "Which sport should we play this weekend?",
        options: ["Soccer", "Basketball", "Tennis", "Volleyball", "Cricket"],
        winnerNeedsMajority: true,
        votingMethod: VotingMethod.SCORE_VOTING,
        hasLocalhostVoted: false,
        voteCount: 4,
    },
    {
        id: "3ae7d902b1c4f85e2a97c013",
        title: "Which book should we read next in the book club?",
        options: ["1984", "To Kill a Mockingbird", "The Great Gatsby", "Pride and Prejudice", "Moby Dick"],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.POSITIONAL_VOTING,
        hasLocalhostVoted: true,
        voteCount: 5,
    },
    {
        id: "b2d5a6f9037c48ea1f60d389",
        title: "What type of cuisine should we try next?",
        options: ["Italian", "Chinese", "Indian", "Mexican", "Greek"],
        winnerNeedsMajority: true,
        votingMethod: VotingMethod.POSITIONAL_VOTING,
        hasLocalhostVoted: false,
        voteCount: 29,
    },
    {
        id: "8ec1b2d4f037a9c8e75b0193",
        title: "Which video game should we play for the tournament?",
        options: ["FIFA", "Call of Duty", "Fortnite", "Minecraft", "Mario Kart"],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.PLURALITY_VOTING,
        hasLocalhostVoted: true,
        voteCount: 55,
    },
    {
        id: "7f42c9e18d3b0a67b25cf0a2",
        title: "What should be the theme for our next event?",
        options: ["80s Retro", "Masquerade", "Beach Party", "Halloween", "Formal Gala"],
        winnerNeedsMajority: true,
        votingMethod: VotingMethod.PLURALITY_VOTING,
        hasLocalhostVoted: false,
        voteCount: 12,
    },
    // MEANT TO BE DELETED TO TEST BEHAVIOR OF DELETED IDS
    {
        id: "2e93b7d10f58c4a6e7d20b9f",
        title: "What kind of workout should we try together?",
        options: ["Yoga", "HIIT", "Pilates", "Running", "Cycling"],
        winnerNeedsMajority: false,
        votingMethod: VotingMethod.PLURALITY_VOTING,
        hasLocalhostVoted: false,
        voteCount: 21,
    },
];
