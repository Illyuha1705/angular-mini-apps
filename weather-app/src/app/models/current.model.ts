export class CurrentModel {
    constructor(
        public temp_c: string,
        public condition: {
            text: string,
            icon: string,
        }) {
    }
}