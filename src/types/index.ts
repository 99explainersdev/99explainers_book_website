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
  };