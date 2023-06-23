export interface IMovie {
    movieId: number,
    title: string,
    actors: number[]
}

export interface IActor {
    actorId: number
    name: string
}

export interface IValidation {
    Name: string,
    KRMovies: string[]
    NCMovies: string[]
}