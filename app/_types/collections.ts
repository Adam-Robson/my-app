export interface ICollection {
    id: number;
    title: string;
    cover: string;
    releaseDate: string;
    description: string;
    tracks: ITrack[];
}

export interface ITrack {
    id: number;
    title: string;
    duration: string;
    artist?: string;
    album?: string;
}
