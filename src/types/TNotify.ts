import { TList } from "./TList";
import { TUser } from "./TUser";

export type TNotify = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    users: TUser[];
    list: TList;
    message:string;
    isWatched:boolean
}