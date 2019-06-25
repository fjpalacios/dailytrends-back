# DailyTrends Backend

This is the backend of the DailyTrends application, a digital newspaper that allows you to view the cover articles of the two most important newspapers in Spain.

Just starting the server the scraping script starts working, in addition, the project has a node cron task, with which every 30 minutes it scraps again automatically.

## FAQ
* Why have you used an RSS parser?
  * For performance reasons. I wanted to scraping the full text of the article, with the library I use, puppeteer, it can be done as it's designed for e2e testing and has a method to click on a link, but the performance is low because for a single link it has to load twice the newspaper page.
* Why have you used a conditional in the creation of a new document in MongoDB?
  * The newspaper 'El País' has a transparent gif when the news has a video, and that news doesn't have pictures, but when scraping it detects it as an image. This transparent image looks horrible in the frontend.
* Why do you have an endpoint that shows all the news and another that only shows the last five?
  * It's a surprise that you'll see in the frontend, but the endpoint that is consumed in the frontend index is the one that shows the last five, because in the test it's requested that the last 5 news of the newspapers be shown.

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

## Testing
If you want to run the test suite you can do it just by typing `make test`.

## License
[GNU GPL v3](LICENSE.txt)

    This program is free software: you can redistribute it and/or modify it under
    the terms of the GNU General Public License as published by the Free Software
    Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with
    this program. If not, see <http://www.gnu.org/licenses/>.
