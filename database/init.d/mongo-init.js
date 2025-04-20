const verivoteUser = "verivoteUser";
const verivotePwd = "verivotePwd";

db = db.getSiblingDB("verivote");

db.createCollection("polls", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Poll Validation",
            required: [
                "creationTime",
                "closingTime",
                "userIdentifier",
                "title",
                "options",
                "winnerNeedsMajority",
                "votingMethod",
                "votes",
            ],
            properties: {
                creationTime: {
                    bsonType: "date",
                },
                closingTime: {
                    bsonType: "date",
                },
                userIdentifier: {
                    bsonType: "string",
                },
                title: {
                    bsonType: "string",
                },
                options: {
                    bsonType: "array",
                    items: { bsonType: "string" },
                },
                winnerNeedsMajority: {
                    bsonType: "bool",
                },
                votingMethod: {
                    bsonType: "int",
                },
                votes: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        title: "Vote Validation",
                        required: ["ip", "pollId", "selection"],
                        properties: {
                            ip: {
                                bsonType: "string",
                            },
                            selection: {
                                bsonType: "array",
                                items: { bsonType: "int" },
                            },
                        },
                    },
                },
            },
        },
    },
});
db.createRole({
    role: "verivoteRole",
    privileges: [
        {
            resource: { db: "verivote", collection: "polls" },
            actions: ["find", "update", "insert", "remove"],
        },
        {
            resource: { db: "verivote", collection: "" },
            actions: ["listCollections"],
        },
    ],
    roles: [],
});
db.createUser({
    user: verivoteUser,
    pwd: verivotePwd,
    roles: [{ role: "verivoteRole", db: "verivote" }],
});
