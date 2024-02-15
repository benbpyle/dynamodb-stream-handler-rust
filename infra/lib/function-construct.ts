import {Construct} from "constructs";
import {ITable} from "aws-cdk-lib/aws-dynamodb";
import {RustFunction} from "cargo-lambda-cdk";
import {Architecture, StartingPosition} from "aws-cdk-lib/aws-lambda";
import {DynamoEventSource} from "aws-cdk-lib/aws-lambda-event-sources";

export class FunctionConstruct extends Construct {
    constructor(scope: Construct, id: string, table: ITable) {
        super(scope, id);

        let sampleFunction = new RustFunction(scope, "SampleFunction", {
            manifestPath: './',
            architecture: Architecture.ARM_64,
            functionName: 'sample-ddb-stream-handler',
            memorySize: 256
        })

        sampleFunction.addEventSource(new DynamoEventSource(table, {
            startingPosition: StartingPosition.LATEST
        }));

        table.grantStreamRead(sampleFunction);
    }
}