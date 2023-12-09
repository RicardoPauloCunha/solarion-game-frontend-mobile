export const delay = (ms: number) => {
    return new Promise(res => setTimeout(res, ms * 0.1))
}