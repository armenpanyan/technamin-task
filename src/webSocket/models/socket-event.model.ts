export interface ISocketEvent<T> {
    rid: string;
    time?: number;
    data: T;
}
