import { ObjectId } from "bson";
import { addDays } from "date-fns";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { VotingMethod } from "@/enum/poll";

import { POLL_FIXTURES } from "./fixtures";

dotenv.config({ path: ".env", override: true });

function getRandomVotes(votingMethod: VotingMethod, optionCount: number) {
    const voteCount = Math.floor(Math.random() * 30);
    const votes = [];
    for (let i = 0; i < voteCount; i++) {
        let selection = [];
        switch (votingMethod) {
            case VotingMethod.APPROVAL_VOTING:
                for (const i of [...Array(optionCount).keys()]) {
                    if (Math.random() < 0.25) {
                        selection.push(i);
                    }
                }
                break;
            case VotingMethod.PLURALITY_VOTING:
                selection.push(Math.floor(Math.random() * optionCount));
                break;
            case VotingMethod.SCORE_VOTING:
                for (let j = 0; j < optionCount; j++) {
                    selection.push(Math.floor(Math.random() * 10) + 1);
                }
                break;
            case VotingMethod.POSITIONAL_VOTING:
            case VotingMethod.INSTANT_RUNOFF_VOTING:
                selection = [...Array(optionCount).keys()].sort(() => 0.5 - Math.random());
                break;
        }
        votes.push({ ip: `::ffff:127.0.0.${i + 2}`, selection });
    }
    return votes;
}

const username = encodeURIComponent(process.env.MONGODB_USER!);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const connection = encodeURIComponent(process.env.MONGODB_DATABASE!);
const uri = `mongodb://${username}:${password}@${process.env.MONGODB_URI!}/${connection}?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

const db = client.db("verivote");
const polls = db.collection("polls");

(async () => {
    await polls.insertMany(
        POLL_FIXTURES.map(fixture => {
            return {
                _id: new ObjectId(fixture.id),
                creationTime: new Date(),
                closingTime: addDays(new Date(), Math.floor(Math.random() * 10) + 1),
                title: fixture.title,
                options: fixture.options,
                userIdentifier: process.env.FIXTURE_USER_IDENTIFIER,
                winnerNeedsMajority: fixture.winnerNeedsMajority,
                votes: getRandomVotes(fixture.votingMethod, fixture.options.length),
                votingMethod: fixture.votingMethod,
            };
        }),
    );
    await polls.deleteOne({ _id: new ObjectId(POLL_FIXTURES[10].id) });
    await client.close();
})();
