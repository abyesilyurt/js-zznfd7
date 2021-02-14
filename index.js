const firebase = require("firebase");
require("firebase/firestore");
import "./style.css";

// init firebase
if (!firebase.apps.length) {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `<h1>Kapan</h1>`;
  const firebaseConfig = {
    apiKey: "AIzaSyCbDK---K4zfNOezXL5sHetjc5Kt_slqWc",
    authDomain: "kapan-e12cf.firebaseapp.com",
    databaseURL: "https://kapan-e12cf.firebaseio.com",
    projectId: "kapan-e12cf",
    storageBucket: "kapan-e12cf.appspot.com",
    messagingSenderId: "343790421984",
    appId: "1:343790421984:web:bb1c7cedab2be30eefcd85",
    measurementId: "G-DV5MDVT2ZQ"
  };
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
var time_delta = 60 * 60 * 8;
var ts = Math.round(new Date().getTime() / 1000) - time_delta;

db.collection("users")
  .doc("abyesilyurt")
  .get()
  .then(doc => {
    const exc = doc.data()["exclude_jobs"];
    const inc = doc.data()["include_jobs"];

    db.collection("projects")
      .where("time", ">", ts)
      .get()
      .then(querySnapshot => {
        const t = $("#table_id").DataTable();
        querySnapshot.forEach(doc => {
          var data = doc.data();
          const doExclude = data["jobs"].filter(value => exc.includes(value));
          const doInclude = data["jobs"].filter(value => inc.includes(value));
          console.log(doInclude);
          if (doInclude.length > 0 && doExclude.length == 0) {
            t.row.add([
              "",
              `<a href="${data["url"]}" target="_blank">${data["id"]}</a>`,
              `${data["bmin"]}- ${data["bmax"]} ${data["currency"]}`,
              data["title"]
            ]);
          }
        });
        t.columns.adjust().draw();
      });
  });

$(document).ready(function() {
  $("#table_id").DataTable({
    order: [[1, "desc"]],
    responsive: true,
    pageLength: 50
    //autoWidth: true
  });
});
