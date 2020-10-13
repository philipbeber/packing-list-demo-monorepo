import * as uuid from "short-uuid";

export class User {
  constructor(public name: string, public camps: Camp[] = []) {}
}

export class Camp {
  constructor(
    public id: string,
    public name: string,
    public lists: List[] = []
  ) {}
}

export class List {
  constructor(
    public id: string,
    public name: string,
    public items: Item[] = []
  ) {}
}

export enum ItemState {
  Unpurchased,
  Purchased,
  PackedIn,
  PackedOut,
}

export class Item {
  constructor(
    public id: string,
    public name: string,
    public state: ItemState = ItemState.Unpurchased,
    public deleted: boolean = false
  ) {}
}

function generateId() {
  return uuid.generate();
}

export function createCamp(name: string) {
  return new Camp(generateId(), name);
}

export function createList(name: string) {
  return new List(generateId(), name);
}

export function createItem(name: string) {
  return new Item(generateId(), name);
}
