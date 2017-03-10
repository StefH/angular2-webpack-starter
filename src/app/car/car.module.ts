import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, PaginatorModule, TooltipModule, TabMenuModule, MenuItem } from 'primeng/primeng';
import { CarGridComponent } from './carGrid.component';
import { CategoryGridODataComponent } from './categoryGridOData.component';
import { CustomerGridODataComponent } from './customerGridOData.component';
import { EmployeeGridODataComponent } from './employeeGridOData.component';

@NgModule({
    imports: [ FormsModule, BrowserModule, DataTableModule, TooltipModule, DialogModule ],
    exports: [ CarGridComponent, CategoryGridODataComponent, CustomerGridODataComponent, EmployeeGridODataComponent ],
    declarations: [ CarGridComponent, CategoryGridODataComponent, CustomerGridODataComponent, EmployeeGridODataComponent ]
})
export class CarModule { }
