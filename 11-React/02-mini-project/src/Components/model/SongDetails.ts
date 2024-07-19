export class SongDetails {
    public songUrl: string
    public name: string
    public priority: string
    public volume: number
    public repeat: boolean

    constructor(songUrl: string, name: string, priority: string, volume: number, repeat: boolean) {
        this.songUrl = songUrl;
        this.name = name;
        this.priority = priority;
        this.volume = volume;
        this.repeat = repeat;
    }
}
