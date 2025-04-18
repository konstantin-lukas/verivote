interface Success<T> {
    data: T;
    error: null;
}
interface Failure<E> {
    data: null;
    error: E;
}
export type Result<T, E = Error> = Success<T> | Failure<E>;

interface ActionSuccess {
    successMessage: string;
    errorMessages: null;
}
interface ActionFailure {
    successMessage: null;
    errorMessages: string[];
}
export type ActionResult = Promise<ActionSuccess | ActionFailure>;
