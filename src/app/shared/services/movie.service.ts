import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options={
 
  headers:{
    accept:'application/json',
    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWMxODRiODNhZTlhYjIxZDg2NmQyMDQyNjBiMWM4YyIsIm5iZiI6MTcyMzQ2ODM0MS4xMzI2NjUsInN1YiI6IjY1YzYxNTNiMWM2YWE3MDE0YTk5NmU5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pgrud8ZHDQZ4vRTdVwSQnhuYDAPMOrKg8pC_oofxSpk'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }
  http=inject(HttpClient);
  getMovies(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie',options);
  }
  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv',options)
  }

  getRatedMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming',options)
  }

  getPopularMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing',options)
  }

  getTopRated() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated',options)
  }


}
