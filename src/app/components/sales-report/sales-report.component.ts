import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Reporte de Comisiones</h2>
      
      <div class="mb-4 flex gap-4">
        <div>
          <label>Fecha Inicio:</label>
          <input 
            type="date" 
            [(ngModel)]="startDate"
            class="border p-2 rounded"
          >
        </div>
        <div>
          <label>Fecha Fin:</label>
          <input 
            type="date" 
            [(ngModel)]="endDate"
            class="border p-2 rounded"
          >
        </div>
        <button 
          (click)="generateReport()"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generar Reporte
        </button>
      </div>

      <div *ngIf="salesReport" class="mt-4">
        <table class="w-full border-collapse border">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">Vendedor</th>
              <th class="border p-2">Total Ventas</th>
              <th class="border p-2">Productos Vendidos</th>
              <th class="border p-2">Comisión</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let report of salesReport">
              <td class="border p-2">{{report.sellerName}}</td>
              <td class="border p-2">{{report.totalAmount | currency}}</td>
              <td class="border p-2">{{report.totalProducts}}</td>
              <td class="border p-2">{{report.commission | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SalesReportComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  salesReport: any[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    // Set default dates to current month
    const now = new Date();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString().split('T')[0];
    this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString().split('T')[0];
    this.generateReport();
  }

  generateReport() {
    this.salesService
      .getSalesReport(new Date(this.startDate), new Date(this.endDate))
      .subscribe(data => {
        this.salesReport = data;
      });
  }
}