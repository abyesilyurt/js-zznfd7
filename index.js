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

db.collection("jobs")
    .onSnapshot(function(snapshot) {
        var t = $('#table_id').DataTable();

        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
                const data = change.doc.data();
                t.row.add( 
                  [`<button id="${data['id']}" action="expand">Details</button>
                  <button id="${data['id']}" action="delete">Delete</button>`,
                  //`<input type="submit" id="${data['id']}" value="Details">`+
                   // `<input type="submit" name="${data['id']}" value="Delete">`,
                    `<a href="https://www.freelancer.com/projects/"${data['id']} target="_blank">${data['id']}</a>`,
                    `${data['bmin']}- ${data['bmax']} ${data['currency']}`,
                  data['title'] ]).draw( false );
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());

                table.rows( function ( idx, data, node ) {
                  //return data[0] === 3;
                  console.log(data);
                } );
                //.remove().draw();
            }
        });

        t.columns.adjust().draw();


        $("button").click(function() {
    console.log(this.id);
    console.log($(this).attr('action'));
});
    });


$(document).ready( function () {
  $('#table_id').DataTable({
    responsive: true,
    //autoWidth: true
  });

});




