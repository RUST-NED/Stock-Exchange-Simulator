function signUp() {
    
    event.preventDefault();
    document.getElementById("signup_error").innerHTML = "";
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    password2 = document.getElementById("password2").value;
    if (password != password2) {
        document.getElementById("signup_error").innerHTML = "Passwords do not match";
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signning User Up");
            // Signed in 
            var user = userCredential.user;
            console.log("user: " + user);

            API_Key = document.getElementById("api").value;
            let db = firebase.firestore();
            console.log("dbbbbb" + db);
            console.log("userid: " + user.uid);

            db.collection("Users").add({
                uid: user.uid,
                email: user.email,
                cash: 10000,
                API_Key: API_Key
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            document.getElementById("signup_error").innerHTML = userCredential.user.email + " has been created";

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if (errorCode == "auth/email-already-in-use") {
                document.getElementById("signup_error").innerHTML = "Email already in use";
            }
            else if (errorCode == "auth/invalid-email") {
                document.getElementById("signup_error").innerHTML = "Invalid email";
            }
            else if (errorCode == "auth/weak-password") {
                document.getElementById("signup_error").innerHTML = "Password is too weak";
            }
            else {
                document.getElementById("signup_error").innerHTML = "Error: " + errorMessage;
            }
        });
    db = null;


    // let db = firebase.firestore();

    // let user_names = ["Kamran", "Ali", "Aamir", "Saad", "Talha"];
    // let symbols = ["AAPL", "MSFT", "GOOG", "FB", "AMZN"];
    // for (let i=0; i<5; i++) {
    //     let name = user_names[i];
    //     db.collection("Users").add({
    //         uid: i * i * 2339 + "iiaeasfhl" + i,
    //         email: name + i + "@gmail.com",
    //         cash: 10000,
    //         API_Key: "API_Key" + i * 22222 + "iiaeaadsfhl" + i
    //         })
    //         .then((docRef) => {
    //             console.log("User Document ", i + 1,  " written with ID: ", docRef.id);
    //         })
    //         .catch((error) => {
    //             console.error("Error adding document: ", error);
    //         });
    //         db.collection("Transactions").add({
    //             uid: i * i * 2339 + "iiaeasfhl" + i,
    //             stock_symbol: symbols[Math.floor(Math.random() * symbols.length)],
    //             num_shares: Math.floor(Math.random() * 100),
    //             price: Math.floor(Math.random() * 100),
    //             // random date from 2020-01-01 to 2021-12-31
    //             date_time: new Date(2020 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 31), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60))

    //         })
    //         .then((docRef) => {
    //             console.log("Transactoon Document ", i + 1,  " written with ID: ", docRef.id);
    //         })
    //         .catch((error) => {
    //             console.error("Error adding document: ", error);
    //         }
    //     );
        
    // }

    // db = null;
}

