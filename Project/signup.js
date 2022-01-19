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
}

