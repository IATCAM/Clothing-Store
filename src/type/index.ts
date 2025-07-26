export interface Iproducts{
  id: string,
  title: string,
  image: string,
  rate: number,
  cost: number,
  section: string,
  description: string
}

export interface Ipagination{
  first: number | null,
  items: number | null,
  last: number | null,
  next: number | null,
  pages: number,
  prev: number | null,
  data: Iproducts[]
}

export interface ITestimonial {
  id: string;
  name: string;
  comment: string;
}

// export interface Idiscounts{
//   id: number,
//   code: string,
//   percentage: number
// }