snort-dump
==========

Ship Snort output to the db


## Installation

1. Clone repo
2. Run `npm install`


## Usage

1. Create a DB file.  See `sample_db_connection.js` for an example.
2. Run table setup if necessary by doing `npm start ./sample_db_connection.js setup`
3. Pipe log files to `stdin` by doing `snort | npm start ./sample_db_connection.js`


## Notes

- __I haven't actually tried this with snort.__  I know, pathetic, right?  I've only run `cat sample-snort.txt | npm start ./sample_db_connection.js`.

- Only works for IPv4 addresses.

- Hasn't been tested with a lot of data.