import { Book } from "./book.model";
import { User } from "./user.model";

export interface Cart {
  user : User,
  items: Book[],
}
