export interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  brand: string;
  image: string;
}

export interface Invoice {
  number: string;
  date: string;
  dueDate: string;
  sender: Company;
  recipient: Company;
  items: Product[];
  notes: string;
}