import { Component } from '@angular/core';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [NavBar,RouterOutlet,Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard { }
