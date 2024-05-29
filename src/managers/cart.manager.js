import { __dirname } from "../helpers/path.js"
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductManager from "./product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      }
      const carts = await this.getAllCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(idCart, idProduct) {
    try {
      const prodExist = await productManager.getProductById(idProduct);
      if (!prodExist) throw new Error('Product not found');
  
      let carts = await this.getAllCarts();
      let cartExist = carts.find(cart => cart.id === idCart);
      if (!cartExist) throw new Error('Cart not found');
  
      const existingProductIndex = cartExist.products.findIndex(prod => prod.product === idProduct);
      if (existingProductIndex !== -1) {
        cartExist.products[existingProductIndex].quantity++;
      } else {
        cartExist.products.push({ product: idProduct, quantity: 1 });
      }
  
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cartExist;
    } catch (error) {
      console.log(error);
    }
  }
}  
