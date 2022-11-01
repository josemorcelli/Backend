export type Tracks = {
    id: string,
    name: string,
    artist: string,
    url: string,
 }
 
export type Playlist = {
     id : string,
     name: string,
     tracks: Tracks[],
 
 }
 
export type Users ={
    id: string,
    playlists : Playlist[],
 }
 