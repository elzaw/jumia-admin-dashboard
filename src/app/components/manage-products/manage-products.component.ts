import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ProductService } from '../../services/product.service'; // Import your ProductService
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [MatFormField, MatTableModule, MatFormFieldModule, MatInputModule, MatTableModule, MatChipsModule, MatPaginatorModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})


export class ManageProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'name', 'brand', 'price', 'quantity_in_stock', 'description'];

  selectedChip: string = 'All';
  chips: string[] = ['Brand', 'Price', 'Quantity'];

  dataSource = new MatTableDataSource<IProduct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: IProduct[]) => {
        this.dataSource.data = products;
      },
      (error) => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChipSelect(event: any) {
    this.selectedChip = event.value;
    if (this.selectedChip === 'Quantity') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => a.quantity_in_stock - b.quantity_in_stock);
    } else if (this.selectedChip === 'Price') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => a.price - b.price);
    } else if (this.selectedChip === 'Brand') {
      const brandName = 'Harraz';
      this.dataSource.filterPredicate = (data: IProduct, filter: string) => data.brand.trim().toLowerCase() === filter;
      this.dataSource.filter = brandName.trim().toLowerCase();
    } else {
      this.loadProducts();
    }
  }

 


}

