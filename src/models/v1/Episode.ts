export default class Episode {
    id: string;
    title: string;
    duration: Number;
    episodeNumber: Number;
    watched: boolean;


    constructor(id: string, title: string, duration: Number, episodeNumber: Number, watched: boolean) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.episodeNumber = episodeNumber;
        this.watched = watched
   }
}