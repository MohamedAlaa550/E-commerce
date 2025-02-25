import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { platformServer } from '@angular/platform-server';
import { PlateformService } from './core/services/palteform/plateform.service';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'E-commerce';
  constructor(private flowbiteService: FlowbiteService) {}

  plateformService = inject(PlateformService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {});

    if (this.plateformService.checkPlateform()) {
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.applyDarkMode();
      console.log(localStorage.getItem('userToken'));
    }
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }
  private applyDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
