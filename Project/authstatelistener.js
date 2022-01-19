firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // window.location.href = "dashboard.html";
    } else {
        // window.location.href = "signin.html";
    }
  });