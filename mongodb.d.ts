import { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

type RecipeExpand = {
  prepTime: number
  cookTime: number
  nutritions: number[]
  authorID: string
  description: string
  ingredientsCategories: string[]
  ingredients: string[][]
  directions: string[][] | number[][]
  date: string
} | null

type Recipe = {
  _id: string
  name: string
  time: number
  dish: string
  expand: RecipeExpand
  images: {
    main: string
  }
}

type User = {
  _id: string
  name: string
  surname: string
}

type BlogPostExpand = {
  parts: string[][]
} | null

type BlogPost = {
  _id: string
  name: string
  description: string
  authorID: string
  date: string
  expand: BlogPostExpand
}
