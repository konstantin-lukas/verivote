const verivotePwd = "verivotePwd";

db = db.getSiblingDB("verivote")

db.createCollection("polls", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Poll Validation",
      required: ["creationTime", "openUntil", "userEmail", "name", "options", "majority", "method"],
      properties: {
        creationTime: {
          bsonType: "date"
        },
        openUntil: {
          bsonType: "date"
        },
        userEmail: {
          bsonType: "string"
        },
        name: {
          bsonType: "string"
        },
        options: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        majority: {
          bsonType: "bool"
        },
        method: {
          bsonType: "int"
        }
      }
    }
  }
})
db.createCollection("votes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Vote Validation",
      required: ["ip", "pollId", "selection"],
      properties: {
        ip: {
          bsonType: "string"
        },
        pollId: {
          bsonType: "objectId"
        },
        selection: {
          bsonType: "array",
          items: { bsonType: "int" }
        }
      }
    }
  }
})
db.votes.createIndex({ ip: 1, pollId: 1 }, { unique: true })
db.createRole({
  role: "verivoteRole",
  privileges: [
    {
      resource: { db: "verivote", collection: "polls" },
      actions: [ "find", "update", "insert", "remove" ]
    }, {
      resource: { db: "verivote", collection: "votes" },
      actions: [ "find", "update", "insert", "remove" ]
    }],
  roles:[]
})
db.createUser({
  user: "verivoteUser",
  pwd: verivotePwd,
  roles: [{ role: "verivoteRole", db: "verivote" }]
})
