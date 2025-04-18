interface Success<T> {
    data: T;
    error: null;
}

interface Failure<E> {
    data: null;
    error: E;
}

export type Result<T, E = Error> = Success<T> | Failure<E>;

export type ActionResult = Promise<Success<string> | Failure<string[]>>;

interface ActionState {
    action: () => void;
    pending: boolean;
}

export interface ActionStateSuccess extends ActionState {
    successMessage: string;
    errorMessages: null;
}

export interface ActionStateFailure extends ActionState {
    successMessage: null;
    errorMessages: string[];
}

export type ActionStateResult = ActionStateSuccess | ActionStateFailure;
