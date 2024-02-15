import {Construct} from "constructs";
import {AttributeType, BillingMode, ITable, StreamViewType, Table} from "aws-cdk-lib/aws-dynamodb";
import {RemovalPolicy} from "aws-cdk-lib";

export class TableConstruct extends Construct {
    private readonly _table: ITable;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this._table = new Table(scope, "SampleStreamTable", {
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
            partitionKey: { name: "Id", type: AttributeType.NUMBER },
            tableName: `SampleStreamTable`,
            stream: StreamViewType.NEW_IMAGE,
        });
    }

    get table(): ITable {
        return this._table;
    }
}