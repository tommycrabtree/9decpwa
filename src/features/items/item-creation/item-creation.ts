import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Product } from '../../../types/product';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-item-creation',
  imports: [JsonPipe],
  templateUrl: './item-creation.html',
  styleUrl: './item-creation.css',
})
export class ItemCreation implements OnInit {
  private productService = inject(ProductService);
  protected products: Product[] = [];
  protected product: Product | null = null;

  ngOnInit(): void {
    console.log('INIT ItemCreation');
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        console.log('STEP 1 - API RESULT', result);

        this.products = result;

        console.log('STEP 2 = AFTER ASSIGN COPY', [...this.products]);

        setTimeout(() => {
          console.log('STEP 3 - LATE CHECK', this.products);
        }, 2000);
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
