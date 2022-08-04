export class Deployment {
    id: number;
    deployment_id: number;
    name: string;
    type: string;
    provider: string;
    create_time: Date;
    destroy_time: Date;
    status: string;
    owner: string;
    requester: string;
}