const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const data = ["Rico", "Leati", "Adé"];

function charToAvoid(word, characs) {
  let response = false;
  characs.forEach((charac) => {
    if (word.includes(charac)) {
      response = true;
    }
  });
  return response;
}

app.get("/", (req, res) => {
  let htmlForm =
    '<h1>Bienvenu sur notre site</h1><form action="/" method="post"><label' +
    ' for="nom">Nom</label><br><textarea name="nom" id="" cols="30" rows="3">' +
    '</textarea><br><br><button type="submit">Enregistrer</button></form>';

  let htmlList = "";

  data.forEach((nom) => {
    htmlList = htmlList + "<li>" + nom + "</li>";
  });

  htmlList = "<ul>" + htmlList + "</ul>";
  res.send(htmlForm + htmlList);
});

app.post("/", (req, res) => {
  //   console.log(req.body);
  let inputData = req.body.nom;
  console.log("inputData", inputData);
  let htmlForm =
    '<h1>Bienvenu sur notre site</h1><form action="/" method="post"><label' +
    ' for="nom">Nom</label><br><textarea name="nom" id="" cols="30" rows="3">' +
    '</textarea><br><br><button type="submit">Enregistrer</button></form>';

  if (charToAvoid(inputData, [">", "<"])) {
    console.log("pas cool");
    let htmlList = "";

    data.forEach((nom) => {
      htmlList = htmlList + "<li>" + nom + "</li>";
    });

    htmlList = "<ul>" + htmlList + "</ul>";
    res.send(
      htmlForm +
        htmlList +
        "<script>alert('Faite attention avec vos pratiques malvaillantes');</script>"
    );
  } else {
    data.push(req.body.nom);
    let htmlList = "";
    data.forEach((nom) => {
      htmlList = htmlList + "<li>" + nom + "</li>";
    });
    htmlList = "<ul>" + htmlList + "</ul>";
    res.send(htmlForm + htmlList);
  }
  let htmlList = "";

  data.forEach((nom) => {
    htmlList = htmlList + "<li>" + nom + "</li>";
  });

  htmlList = "<ul>" + htmlList + "</ul>";
  res.send(htmlForm + htmlList);
});
app.listen(3001);
console.log("Lapplication marche au 3001");
