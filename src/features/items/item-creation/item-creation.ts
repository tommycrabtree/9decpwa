import { Component, inject, OnInit, signal } from '@angular/core';
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
  protected products = signal<Product[]>([]);
  protected product = signal<Product | null>(null);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.products.set(result);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (result) => {
        this.product.set(result);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
