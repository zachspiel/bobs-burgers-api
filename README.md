![](https://img.shields.io/badge/Coverage-96-83A603.svg?prefix=$coverage$) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Banner Image](./public/images/readme-banner.jpg?raw=true "Banner image")

# The Bob's Burgers API

The [Bob's Burgers API](https://bobsburgers-api.herokuapp.com/) is a REST/GraphQL API based on the television show Bob's Burgers. The Bob's Burgers API contains data for hundreds of characters, episodes, running gags and images from the show.

## Getting Started

### Configuration

This project requires two environment variables to be added to a `.env` file, `DATABASE_URL` (required) and `PORT` (optional). If `PORT` is not defined, then port 5000 will be selected by default.

> ❗ **IMPORTANT:** The database URL must match the format mongodb+srv://{username}:{password}@{cluster}/{database}

### Installation

Install the required dependencies with Yarn.

```bash
yarn install
```

## API Documentation

Checkout out the [Bob's Burgers API Website](http://bobs-burgers-api-ui.herokuapp.com/) to learn more about the API.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.txt)
