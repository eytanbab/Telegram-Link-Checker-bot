# Telegram link checker

Telegram bot that checks for **malicious** links

# How to use

To clone and run this application, you'll need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)), [Telegram](https://telegram.org/) and [API token](https://www.ipqualityscore.com/) from IPQualityScore installed on your computer.
From your command line:

    # Clone this repository
    $ gitclone https://github.com/eytanbab/Telegram-Link-Checker-bot

    # Go into the repository
    $ cd Telegram-Link-Checker-bot

    # Install dependencies
    $ npm install

    # Create .env and define tokens from telegram and IPQualityScore
    $ cat > .env
    $ TELEGRAM_TOKEN = {telegram_token}
    $ LINK_CHECK_TOKEN= {ipqualityscore_token}

    ## Run the app
    $ npm start
