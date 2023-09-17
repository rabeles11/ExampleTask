# Luxonis task

**Assignment**

Scrape the first 500 items (title, image url) from sreality.cz (flats, sell - you can switch the web to English) and save it in the Postgresql database. Implement a simple HTTP server (or use Nginx) and show these 500 items on a nice page (with pagination) which will use your own design and put everything to single docker-compose command so that I can just run "docker-compose up" in the Github repository and see the scraped ads on http://127.0.0.1:8080 page. Use Typescript and React for implementation

**How to run this project**

- Clone the github repo
- Run `docker compose up`

**Project structure**

- **backend** http://localhost:5000
  - Express Node server , with ORM via sequelize lib with controllers
- **frontend** http://localhost:8080
  - React-app builded with VITE, written in Typescript with ESlint
- **init-scripts**
  - Default script, that helps docker to create initial table scheme

**API endpoint**
http://localhost:5000

- **getAllEstatesPaginated** (GET)
  - http://localhost:5000/estate
  - params:
    - page - Value for current page
    - perPage - Value for numbers of items in each page
