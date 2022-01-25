// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       window.location.href = "dashboard.html";
//       console.log(user);
//     } else {
//         window.location.href = "signin.html";
//         console.log("NO USER");
//     }
//   });

// let user = firebase.auth().currentUser;

// if user not logged in
if (firebase.auth().currentUser)
{
  window.location.href = "dashboard.html";
}