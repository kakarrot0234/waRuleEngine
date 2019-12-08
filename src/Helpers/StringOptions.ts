export class StringOptions {
    static IsNullOrEmpty(text: string | undefined) {
        return text === undefined || text === null && text === "";
    }
}