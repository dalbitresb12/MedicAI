import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Toast} from "primeng/toast";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, FormsModule, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'appMedicAIFront';

}
