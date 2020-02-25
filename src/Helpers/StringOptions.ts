export class StringOptions {
    static isNullOrEmpty(text: string | undefined) {
        return text == null || text === "";
    }
}