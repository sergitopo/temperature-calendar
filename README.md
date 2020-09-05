## temperature-calendar

![Temperature Calendar](http://ec2-3-250-218-11.eu-west-1.compute.amazonaws.com/temperature-calendar_preview.PNG)


  This a Vue.js web application to display a calendar with anomalies in cold/warm color scale. It displays a current year Calendar with the anomalies until yesterday.
It has a responsive design to fit the calender on the screen size, clicking in one day, it shows the temperature anomaly of that date.

# Web application
  Under the **client** folder it is the web app code, to set a development enviroment just go to this folder and make *npm install*.
After that, just do the same but *npm serve* command instead.

The data about daily temperatures and the weekly averages to calculate the anomalies are stored in a Elastisearch instance, if you want to include you temperature/meteorologic station record data just insert data with the *daily_temperature* index, following the same structure.
A record with the following data at least:

  - temperature_avg: (Floating number in Cº degrees)
  - station id: an identifier to your station
  - date: e.g "15-10-2020"
  - week_number: (integer the week of the year the day belongs to)
  - month: (integer from 1 to 12)
  
Once you have some years of date in the index, the client request to elastic form the average temperature for each week of the year, and computes the anomalies for every day and  a color is assigned to it afterwards.

# Scrapping process

  For the case of the examaple, I don't have the daily data of my town, but it is collected and published by a non-professional meteorologic association called avamet.
[Avamet](https://avamet.org)
So, I implemented a scrapping program in node.js to get the daily records from it, because they don't have a API to pull data from.

It is a very simple program that scrappes the web month by month given two dates and inserts data in a Elasticsearch instance.

To use it, just go to the **avamet-scrapping-process** folder and make the following installs of dependencies:

  - npm install cheerio
  - npm install request-promise'
  - npm install request'
  
Then you can start the programming executing *node process-all.js* for retrieve and save the historical data or *node process-yesterday.js* every day to save the last date (this has to be done every day automatically)
