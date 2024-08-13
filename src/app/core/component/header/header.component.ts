import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({required:true}) userImg:string='';
  auth=inject(AuthService);
  username=JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  navlist=["Home","Tv Shows","News & Popular","My List"];



}
