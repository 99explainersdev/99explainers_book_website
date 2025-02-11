// import { ObjectId } from "mongodb";

type Price = {
    original: number;
    discounted: number;
  };
  
  export type Book = {
    _id: string;  
    title: string;
    author: string;
    illustrator: string;
    copyediting: string;
    book_design: string;
    isbn: string;
    format: string;
    pages: number;
    size: string;
    publication_date: string;
    price: Price;
    description: string;
    image_url: string;
    ages_category: string;
    books_category: string;
    quantity?: number;
  };
  


  export interface OrderItem {
    _id: string;
    title: string;
    description: string;
    author: string;
    isbn: string;
    publication_date: string;
    pages: number;
    format: string;
    size: string;
    price: Price;
    image_url: string;
    books_category: string;
    ages_category: string;
    book_design: string;
    copyediting: string;
    illustrator: string;
    quantity: number;
}

export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cartItems: OrderItem[];
}