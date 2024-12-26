#!/usr/bin/env node
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const ora = require('ora');

class TMDBClient {
    constructor() {
        this.baseURL = 'https://api.themoviedb.org/3';
        this.apiKey = process.env.TMDB_API_KEY;
        if (!this.apiKey) {
            throw new Error('TMDB_API_KEY environment variable not set');
        }
    }

    async getMovies(type) {
        const endpoints = {
            playing: '/movie/now_playing',
            popular: '/movie/popular',
            top: '/movie/top_rated',
            upcoming: '/movie/upcoming'
        };

        if (!endpoints[type]) {
            throw new Error(`Invalid movie type. Choose from: ${Object.keys(endpoints).join(', ')}`);
        }

        try {
            const response = await axios.get(`${this.baseURL}${endpoints[type]}`, {
                params: { api_key: this.apiKey },
                timeout: 10000
            });
            return response.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }
    }
}

function displayMovies(movies) {
    console.log('\nMovies:');
    console.log(chalk.gray('-'.repeat(80)));

    movies.results.forEach(movie => {
        console.log(chalk.bold.green(`Title: ${movie.title}`));
        console.log(chalk.blue(`Release Date: ${movie.release_date}`));
        console.log(chalk.yellow(`Rating: ${movie.vote_average}/10 (${movie.vote_count} votes)`));
        console.log(`Overview: ${movie.overview.slice(0, 200)}...`);
        console.log(chalk.gray('-'.repeat(80)));
    });
}

async function main() {
    const argv = yargs(hideBin(process.argv))
        .option('type', {
            alias: 't',
            describe: 'Type of movies to fetch',
            choices: ['playing', 'popular', 'top', 'upcoming'],
            demandOption: true
        })
        .help()
        .argv;

    try {
        const spinner = ora('Fetching movies...').start();
        const client = new TMDBClient();
        const movies = await client.getMovies(argv.type);
        spinner.succeed('Movies fetched successfully!');
        displayMovies(movies);
    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    }
}

main();