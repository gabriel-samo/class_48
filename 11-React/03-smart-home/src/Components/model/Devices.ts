import { EpIds } from "./EpIds";

export class Devices {
    public id: number;
    public name: String;
    public location: String;
    public nodeId: number;
    public epIds: EpIds[];

    constructor(id: number, name: String, location: String, nodeId: number, epIds: EpIds[]) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.nodeId = nodeId;
        this.epIds = epIds;
    }
}