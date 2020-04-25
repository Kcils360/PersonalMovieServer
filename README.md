# PersonalMovieServer
An app for my home server to run my movies.  Search function and display all tiles, etc. with a unique URL I can reach from anywhere.

This app is built in three phases. Phase one is to read in my movie collection and store the movie info in a database. Phase two is to build the browser app to display my movie collection aestheticly, and when selected, plays the desired movie.  Phase three will be to deploy the database and application on my home server, so I can access the app from any device in my home, or outside using my cellular network.

Phase One - 
With over 800 movies on my hard drive, I do not wish to search for, locate, and manually input all of the info for each movie I have.  I will utilize the free [The Movie DB api](https://www.themoviedb.org) to collect information which I will use to search for movies using my app. By automating this process, I will save myself hours of time and effort.

Phase Two - 
The app itself will be a browser based app which will search for and display the movies in my collection.  I will have a search feature that can search by parameters such as Title, Director, Release Date, Actor, Genre.  Each movie will be able to display the official poster, as well as the tagline. When a movie is selected to watch, the app will stream the movie to that device.

Phase Three - 
Development will be on my development machine, but I will host the app on my own home server.  I will run Node.js alongside an instance of MS SQL Server, and will have the ability to hit the application from any device. This will include OAuth, and options for whitelisting only certain IPs using my home firewall.
