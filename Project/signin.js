function signIn() {
    let uzr = firebase.auth().currentUser;
    if (uzr) {
        console.log("User already logged in");
        window.location.href = "dashboard.html";
        return;
    }
    else
        {
            console.log("No user logged in");
            console.log(uzr);
        }
    // event.preventDefault();
    // if (firebase.auth().currentUser) {
    //     console.log("Already signed in");
    //     window.location.href = "dashboard.html";
    //     return;
    // }
    // else
    // {
    //     console.log("Not signed in");
    //     return;
    // }


    document.getElementById("signin_error").innerHTML = "";
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signning User In");
            // Signed in 
            var user = userCredential.user;
            console.log("user: " + user);
            document.getElementById("signin_error").innerHTML = user.email + " has been signed in";
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if (errorCode == "auth/wrong-password") {
                document.getElementById("signin_error").innerHTML = "Wrong password";
            }
            else if (errorCode == "auth/user-not-found") {
                document.getElementById("signin_error").innerHTML = "User not found";
            }
            else {
                document.getElementById("signin_error").innerHTML = "Error: " + errorMessage;
            }
        });
}
