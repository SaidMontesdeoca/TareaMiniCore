import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { SalesReportComponent } from './app/components/sales-report/sales-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SalesReportComponent],
  template: `
    <main>
      <app-sales-report></app-sales-report>
    </main>
  `,
})
export class App {
  name = 'Sistema de Comisiones';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});