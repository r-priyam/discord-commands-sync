<div align="center">

# discord-commands-sync

**A CLI tool to manage discord application commands**

[![GitHub](https://img.shields.io/github/license/r-priyam/discord-commands-sync)](https://github.com/r-priyam/discord-commands-sync/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/discord-commands-sync)](https://www.npmjs.com/package/discord-commands-sync)

</div>

## Description

Managing discord application commands is a bit tricky thing to do, especially if
you want to manage commands across multiple discord servers or even globally.
Writing custom script to manage commands is a bit of a hassle, and this tool is
designed to make it a bit easier interactively. You just need to run one command
and select required options from the `CLI UI` and `discord-commands-sync` will
handle the rest.

Please do note that currently passing `CLIENT_SECRET` instead of `BOT_TOKEN` is
not supported.

## Before you start

Please make sure that you have `.env` file setup in your project root directory
with the following credentials:

- `BOT_TOKEN`: Your bot token to update commands for.
- `BOT_CLIENT_ID`: Your bot client id to fetch commands for.

Both of these are required to run the tool.

## Usage

Please see the below `GIF` for a quick demonstration of the tool.

<img height="320" alt="Good UX with Postgres.js" src="https://raw.githubusercontent.com/r-priyam/discord-commands-sync/main/demo.gif">
