# DailyTrends Backend
**Work in progress**

This is the backend of the DailyTrends application, a digital newspaper that allows you to view the cover articles of the two most important newspapers in Spain.

## Requirements
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/)

## Installation
You can change the settings of this application just by editing the `.env.example` file.

```console
$ git clone git@github.com:fjpalacios/dailytrends-back.git
$ cd dailytrends-back
$ mv .env.example .env
$ make build
$ make run
```

## License
[GNU GPL v3](LICENSE.txt)

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.
