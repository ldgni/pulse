# Pulse

**Pulse** provides performance updates on the french football club [Paris Saint-Germain](https://en.wikipedia.org/wiki/Paris_Saint-Germain_F.C.).

## Features

- **Fixtures**: Display data about upcoming matches
- **Results**: Display past match results
- **Standings**: Track Ligue 1 standings and highlight PSG's position

## Data Source

All data on **Pulse** is fetched in real-time from the [football-data.org](https://www.football-data.org/) API.

## Running Locally

1. Clone the repository to your local machine:

```sh
git clone https://github.com/ldgni/pulse.git
```

2. Navigate inside the project directory:

```sh
cd pulse
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env.local` file in the root directory of the project. This file will hold all your environment variables. For this project, you will need to get an API key from [football-data.org](https://www.football-data.org/). Once you have the key, add it to the `.env.local` file like this:

```sh
FOOTBALL_DATA_API_KEY=<your-api-key>
```

5.  Start the development server:

```sh
npm run dev
```

## Contributing

Pull requests are appreciated. For major changes, please open an issue first.

## License

This project is licensed under the terms of the [MIT License](LICENSE).
