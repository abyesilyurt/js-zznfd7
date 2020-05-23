const firebase = require("firebase");
require("firebase/firestore");
import './style.css';

// init firebase
if (!firebase.apps.length) {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `<h1>JS Starter</h1>`;
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
var time_delta = 60 * 60*  8;
var ts = Math.round((new Date()).getTime() / 1000) - time_delta;
var q = db.collection("jobs").where('time', '>', ts);

q.onSnapshot(function(snapshot) {
      var t = $('#table_id').DataTable();

      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New entry: ", change.doc.data());
              const data = change.doc.data();
              t.row.add( 
                ['',
                  // `<button id="${data['id']}" action="expand">Details</button>
                  // <button id="${data['id']}" action="delete">Delete</button>`,
                  `<a href="https://www.freelancer.com/projects/${data['id']}" target="_blank">${data['id']}</a>`,
                  `${data['bmin']}- ${data['bmax']} ${data['currency']}`,
                data['title'] ]).draw( false );
          }
          if (change.type === "modified") {
              //console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              //console.log("Removed city: ", change.doc.data());
          }
      });

  t.columns.adjust().draw();


  console.log("timestamp: ", ts);
  ts = Math.round((new Date()).getTime() / 1000) - time_delta;
  //q = db.collection("jobs").where('time', '>', ts);

});


$(document).ready( function () {
  $('#table_id').DataTable({
    "order": [[ 1, "desc" ]],
    responsive: true,
    //autoWidth: true
  });
});




