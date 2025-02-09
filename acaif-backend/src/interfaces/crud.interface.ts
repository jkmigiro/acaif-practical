import { PerformanceMetric } from "src/schemas/performanceMetric.schema";

export default interface ICrud<T>{
    create(entity:T):void
    findAll():Promise<T[]>
    findById(id:any):Promise<T | null>

}
