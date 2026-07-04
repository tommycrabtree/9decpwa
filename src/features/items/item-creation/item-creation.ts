import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-item-creation',
  imports: [],
  templateUrl: './item-creation.html',
  styleUrl: './item-creation.css',
})
export class ItemCreation implements OnInit {
  private productService = inject(ProductService);
  protected products: Product[] = [];
  protected product: Product | null = null;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (result) => {
        this.product = result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
