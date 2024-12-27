<a id="readme-top"></a>

<div align="center">
[![Unlicense License][license-shield]]
[![LinkedIn][linkedin-shield]][linkedin-url]
</p>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AdrianGlez18">
    <img src="/public/logo.png" alt="Logo" width="160" height="80">
  </a>

  <p align="center">
  <br />
  <br />
    A tool to create and share your art!
    <br />
    <br />
    <a href="https://vidextdrawer.vercel.app/">View Demo</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#pages">Pages</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screens">Screens</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://vidextdrawer.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project was developed with:

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Tailwind][TailwindCSS]][Tailwind-url]
- [![Shadcn][Shadcn-img]][Shadcn-url]
- [![Prisma][Prisma-img]][Prisma-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

It is highly recommended to test it directly online using <a href="">this link</a>. If you are testing it online, continue the guide in <a href="#screens">Screens</a>.

### Prerequisites

It is required to have npm (or any other package manager) installed to use the app locally.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Step by step installation guide:

1. Clone the repo
   ```sh
   git clone https://github.com/AdrianGlez18/vidextdrawer.git
   ```
2. Open the project in your prefered editor and in a terminal
3. Install the dependencies
```node
   npm install
   ```
4. Create a .env file
5. Create a Supabase Project and add the environment variables DATABASE_URL and DIRECT_URL to .env
6. Register in the OPENAI API and add your key as NEXT_PUBLIC_OPENAI_API_KEY in .env
7. Register in imgbb api and add your key as IMGDB_PRIVATE_KEY
8. Initialize Prisma
```node
   npx prisma generate
   ```
9. Run dev mode to start using the web locally
```node
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screens

This web has 3 main screens

### Home

[![Product Name Screen Shot][product-screenshot]](https://vidextdrawer.vercel.app/)

Home Page of the project. Includes basic information about the web and its tools. There is a button to access to the editor.


### Canvas

[![Product Name Screen Shot][canvas-screenshot]](https://vidextdrawer.vercel.app/)

The main editor. It is always associated with an id that allows the user to have multiple drafts at the same time and edit them. A title can be assigned.

It includes all tldraw tools, like free draw or creating figures. It also has a new tool in the toolbar to generate an svg with Vidext logo.

### Gallery

The pages where all draws are stored. It has two sections:

#### User gallery

[![Product Name Screen Shot][draws-screenshot]](https://vidextdrawer.vercel.app/)

All the draws the current user has made. These draws are stored in localStorage. All these draws can be edited or deleted at any time. There is also an option to make them public, storing them in a public database.

#### Public gallery

[![Product Name Screen Shot][gallery-screenshot]](https://vidextdrawer.vercel.app/)

All the drawings uploaded by all users will be public here for anyone to see them. These are stored in a supabase postgress db using Prisma. The process is type-secure using tRPC. Users can also access a menu to interact with OpenAI models to describe or judge the draws. **Note: This will only work if you are using your own OpenAI API Key or is the app key has credits.**

<!-- LICENSE -->

## License

Distributed under the Unlicense License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Adrián González - contact@aglez.dev

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/adri%C3%A1n-gonz%C3%A1lez-hern%C3%A1ndez/
[product-screenshot]: /public/screenshot.png
[canvas-screenshot]: /public/screenshot-canvas.png
[gallery-screenshot]: /public/screenshot-gallery.png
[draws-screenshot]: /public/screenshot-draws.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[TailwindCSS]: https://img.shields.io/badge/tailwind-11cde7?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Shadcn-img]: https://img.shields.io/badge/shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Prisma-img]: https://img.shields.io/badge/prisma-000000?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
