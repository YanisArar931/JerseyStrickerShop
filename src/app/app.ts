import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.components';
// import { JerseyListComponent } from './features/jersey/components/jersey.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  title = signal('JerseyStrickerShop');
}
