import { ChargerStatus } from "./chargerstatus.model";
import { ChargerType } from "./chargertype.model";
import { PlugType } from "./plugtype.model";

export interface ChargerPoint {
    id?: number;
    address: string;
    latitude: number;
    longitude: number;
    plugType: PlugType;
    power: ChargerType;
    status: ChargerStatus;
}

