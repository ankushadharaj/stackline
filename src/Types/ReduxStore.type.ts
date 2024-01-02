export interface InitialState<T> {
    data?: T,
    isLoading: boolean,
    isError: boolean,
    error?: any | null
}

export interface Action<T> {
    type: string,
    payload?: T
}