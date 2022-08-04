export class DeploymentDetails {
    deployment_id: number;
    run_id: number;
    prov_engine_id: number;
    submit_time: Date;
    completion_time: Date;
    status: string;
    request: RequestDetails[];
    output: OutputDetails[];
}

export class RequestDetails {
    name: string;
    internal_name: string;
    type: string;
    provider: string;
    owner: string;
    requester: string;
    lifespan: number;
    account: string;
}

export class OutputDetails {
    local_admin_password: TypeDetail;
    local_admin_username: TypeDetail;
    url!: TypeDetail;
}

export class TypeDetail {
    sensitive: string;
    type: string;
    value: string
}