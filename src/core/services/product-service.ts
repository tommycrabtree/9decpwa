import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Product } from "../../types/product";

@Injectable({
  providedIn: 'root',
})

export class ProductService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getProducts() {
        return this.http.get<Product[]>(this.baseUrl + 'products');
    }

    getProduct(id: number) {
        return this.http.get<Product>(this.baseUrl + 'products/' + id);
    }
}
