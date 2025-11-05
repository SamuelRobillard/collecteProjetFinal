
import Media from "./Media";


export default class User {


    id: string;
    username: string
    email: string;
    password: string;
    role: string;
    favorites: Media[]

    constructor(id: string, username: string, email: string, password: string, role: string, favorites: Media[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        role == "user" || role == "admin" ? this.role = role : this.role = "user"
        this.favorites = favorites;
    }

    addFavorite(media: Media) {
        this.favorites.push(media)
    }
    removeFavorite(mediaId: string) {
        this.favorites = this.favorites.filter(media => media.id !== mediaId);
    }

}

