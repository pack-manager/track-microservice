
export class DateHelper {
    constructor(
        private dateObj: Date = new Date()
    ) { }

    getDate(): string {
        return `${this.dateObj.getDate()}/${this.dateObj.getMonth()}/${this.dateObj.getFullYear()}`
    }

    getTime(): string {
        return `${this.dateObj.getHours()}h${this.dateObj.getMinutes()}`
    }
}