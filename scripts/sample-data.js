const AWS = require('aws-sdk');

const region = "us-west-2";
const accessKeyId = process.env.DYNAMODB_ACCESS_KEY_ID;
const secretAccessKey = process.env.DYNAMODB_SECRET_ACCESS_KEY;
const tableName = "SampleStreamTable";

const dynamoDB = new AWS.DynamoDB({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

for (var i = 0; i < 100000; i++) {
// One item with two properties: question_id and title.
    const params = {
        Item: {
            Id: {
                N: i.toString()
            },
            Message: {
                S: `A message for Id ${i}`
            },
            EntityType: {
                S: 'Message'
            }
        },
        TableName: tableName,
    };

    dynamoDB.putItem(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log('Data saved');
        }
    });

}

