export class StringOptions {
    static IsNullOrEmpty(text: string) {
        return text === undefined || text === null && text === "";
    }
}