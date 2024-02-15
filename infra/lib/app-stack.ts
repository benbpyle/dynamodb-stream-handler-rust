import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {TableConstruct} from "./table-construct";
import {FunctionConstruct} from "./function-construct";

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const tableConstruct = new TableConstruct(this, 'TableConstruct');
        const functionConstruct = new FunctionConstruct(this, 'FunctionConstruct', tableConstruct.table);
    }
}