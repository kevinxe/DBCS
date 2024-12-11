import { PlugType } from "./plugtype.model";

export interface Vehicle {
    id?: number;  // El '?' indica que el atributo es opcional, útil cuando se crean nuevos vehículos y aún no tienen id
    carRegistration: string;
    brand: string;
    model: string;
    capacity: number;
    plugType: PlugType;
    userId?: number;  
}
