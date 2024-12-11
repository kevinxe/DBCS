export enum Status {
  NOT_STARTED = "NOT_STARTED",
  CHARGING = "CHARGING",
  COMPLETED = "COMPLETED"
}

export enum Payment {
  NOT_PROCESSED="NOT_PROCESSED", 
  CANCELLED="CANCELLED", 
  PENDING="PENDING", 
  COMPLETED="COMPLETED"
}



export interface Recharge {
    id?: number;  // El '?' indica que el atributo es opcional
    userId: number;
    vehicleId: number;
    chargerpointId: number;
    price? : number;
    kw? : number,
    status?: Status;  // Agregado aquí
    payment? : Payment
    
  }