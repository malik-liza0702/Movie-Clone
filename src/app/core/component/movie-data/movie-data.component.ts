import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../../shared/models/video-content.interface';
import { DescriptionPipe } from '../../../pipes/description.pipe';
import { ImagePipe } from '../../../pipes/image.pipe';
@Component({
  selector: 'app-movie-data',
  standalone: true,
  imports: [CommonModule,DescriptionPipe,ImagePipe],
  templateUrl: './movie-data.component.html',
  styleUrl: './movie-data.component.css'
})
export class MovieDataComponent{
  cards = Array.from({ length: 20 }, (_, i) => i + 1);

  scrollLeft(): void {
    const container = document.querySelector('.cards-container');
    container!.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    const container = document.querySelector('.cards-container');
    container!.scrollBy({ left: 300, behavior: 'smooth' });
  }

  @Input()videoContents:IVideoContent[]=[];
  @Input()title!:string;
  
}
