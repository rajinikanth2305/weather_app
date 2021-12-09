const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
console.log("hello");
console.log(path.join(__dirname, "../public"));
const app = express();
//app.com
//app.com/help/aboutapp.get()
//Defined paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
//Register partials
hbs.registerPartials(partialsPath);
//Setup static directory to use
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    name: "rajinikanth reddy",
  });
});

app.get("/about", (req, res) => {
  res.render("About", {
    name: "Jeevan REddy",
    title: "About me",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    helpText: "I would like to help you at any time",
    title: "Help",
    name: "Rajinikanth Reddy Varala",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an adddress",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must providesearch term",
    });
  }

  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Varala Sanjay REddy",
    errorText: "Help article Not Found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "varala Janga Reddy",
    errorText: "Page Not Found",
  });
});
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//command to restart server for every changes in app.js file and hbs file
//nodemon src/app.js -e js,hbs
