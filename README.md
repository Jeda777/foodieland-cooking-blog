# foodieland-cooking-blog

Cooking blog and recipe site that stores users, posts, and recipes on a database and has its own API routes. Design is from figma comunity.

- [design](https://www.figma.com/community/file/1093372331682706566)

## Table of contents

- [Links](#links)
- [How to run](#how-to-run)
- [Built with](#built-with)
- [Screenshots](#screenshots)

## Links

- [home](https://hilarious-puppy-107ba1.netlify.app)
  - [/recipes](https://hilarious-puppy-107ba1.netlify.app/recipes)
    - [/recipes/[id]](https://hilarious-puppy-107ba1.netlify.app/recipes/6373f9f4061fefa272437741) (Only recipe with details)
  - [/blog](https://hilarious-puppy-107ba1.netlify.app/blog)
    - [/blog/[id]](https://hilarious-puppy-107ba1.netlify.app/blog/63753427f2a719d3998759c3) (Only post with details)
  - [/contact](https://hilarious-puppy-107ba1.netlify.app/contact)
  - api
    - [/recipes](https://hilarious-puppy-107ba1.netlify.app/api/recipes?page=1)
      - [/[id]](https://hilarious-puppy-107ba1.netlify.app/api/recipes/6373f9f4061fefa272437741)
    - [/blogPosts](https://hilarious-puppy-107ba1.netlify.app/api/blogPosts)
      - [/[id]](https://hilarious-puppy-107ba1.netlify.app/api/blogPosts/63753427f2a719d3998759c3)
      - [/user/[id]](https://hilarious-puppy-107ba1.netlify.app/api/blogPosts/user/6375174af2a719d3998759bd)
    - [/users](https://hilarious-puppy-107ba1.netlify.app/api/users)
      - [/[id]](https://hilarious-puppy-107ba1.netlify.app/api/users/6375174af2a719d3998759bd)

## How to run

```
npm run dev
```

## Built with

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [SASS](https://sass-lang.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Screenshots

### Home

![](./screenshots/screenshotHome.png)

### Recipes page

![](./screenshots/screenshotRecipes.png)

### Recipe details page

![](./screenshots/ScreenshotRecipeDetails.png)

### Blog page

![](./screenshots/screenshotBlog.png)

### Post page

![](./screenshots/screenshotPost.png)

### Contact page

![](./screenshots/screenshotContact.png)
