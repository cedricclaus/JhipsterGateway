
const enum ReleaseType {
    'beta',
    'rc',
    'release'

};
export class Entity1 {
    constructor(
        public id?: string,
        public name?: string,
        public size?: number,
        public releaseDate?: any,
        public type?: ReleaseType,
    ) {
    }
}
