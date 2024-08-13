import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HeaderComponent } from '../../core/component/header/header.component';
import { BannerComponent } from '../../core/component/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieDataComponent } from '../../core/component/movie-data/movie-data.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent,BannerComponent,MovieDataComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  cards = Array.from({ length: 20 }, (_, i) => i + 1);

  scrollLeft(): void {
    const container = document.querySelector('.cards-container');
    container!.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    const container = document.querySelector('.cards-container');
    container!.scrollBy({ left: 300, behavior: 'smooth' });
  }

  auth=inject(AuthService);
  movieService=inject(MovieService);
  name:string=JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  userProfileImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;

  movies:IVideoContent[]=[];
  popularMovies:IVideoContent[]=[];
  ratedMovies:IVideoContent[]=[];
  topRated:IVideoContent[]=[];
  tvShows:IVideoContent[]=[];


  sources=[
    this.movieService.getMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getRatedMovies(),
    this.movieService.getTopRated(),
    this.movieService.getTvShows(),
  ]

  ngOnInit(): void {
      forkJoin(this.sources)
      .pipe(
      map(([movies,popularMovies,ratedMovies,topRated,tvShows])=>{
        return {movies,popularMovies,ratedMovies,topRated,tvShows};

      })
      )
      .subscribe((res:any)=>{
        this.movies=res.movies.results as IVideoContent[];
        this.popularMovies=res.popularMovies.results as IVideoContent[];
        this.ratedMovies=res.ratedMovies.results as IVideoContent[];
        this.topRated=res.topRated.results as IVideoContent[];
        this.tvShows=res.tvShows.results as IVideoContent[];
        
      })
      
  }
  signOut(){
    sessionStorage.removeItem("LoggedInUser");
    this.auth.signOut();
  }

}
