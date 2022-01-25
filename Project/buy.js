document.addEventListener("DOMContentLoaded", function (event) {
    var firebaseConfig = {
            apiKey: "AIzaSyCWsPJAyTMiumWv_qNc3_tqFYFbylXXrmI",
            authDomain: "stonk-exchange-simulator.firebaseapp.com",
            projectId: "stonk-exchange-simulator",
            storageBucket: "stonk-exchange-simulator.appspot.com",
            messagingSenderId: "66819505535",
            appId: "1:66819505535:web:4fe2c33891823e56b92e4a",
            measurementId: "G-6627BR1CP4"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    let uzr = firebase.auth().currentUser;
    if (uzr) {
        console.log("User already logged in");
    }
    else {
        console.log("No user logged in");
        console.log(uzr);
        // window.location.href = "signin.html";
        // return;
    }
    console.log("DOMContentLoaded");
    document.getElementById("buy_btn").addEventListener("click", buy_stock);
});


function buy_stock() {
    document.getElementById("buy_error").innerHTML = "";
    let symbol = document.getElementById("symbol").value;
    let shares = document.getElementById("shares").value;

    if (!symbol || !shares) {
        document.getElementById("buy_error").innerHTML = "Please enter a symbol and number of shares";
    }
    else {
        console.log("processing transaction");
        let u = firebase.auth().currentUser;
        if (u) {
            let user_id = u.uid;
            console.log("user_id: " + user_id);
            let db = firebase.firestore();
            db.collection("users").where("uid", "==", user_id).limit(1).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        console.log(doc.data()["API_Key"])
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        else {
            console.log("No user logged in");
            console.log(currentUser);
            // firebase.auth().signOut().then(() => {
            //     console.log("Signed out");
            //     window.location.href = "signin.html";
            //   }).catch((error) => {
            //     // An error happened.
            //     console.log("Error signing out: ", error);
            //   });
        }
    }

}

