# TMDB CLI Tool

A Node.js CLI for fetching movie information from The Movie Database (TMDB).

Project based on: [roadmap.sh TMDB CLI Project](https://roadmap.sh/projects/tmdb-cli)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set your TMDB API key:

```bash
export TMDB_API_KEY="your_api_key_here"
```

3. Make the script executable and link it:

```bash
chmod +x tmdb-cli.js
npm link
```

## Usage

```bash
tmdb-app --type <movie_type>
```

Available types: playing, popular, top, upcoming

Example:

```bash
tmdb-app --type popular
```
