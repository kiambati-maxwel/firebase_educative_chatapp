// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFx74XvLVlYKAfeiBO4Q8WdqvLguiuek4",
  authDomain: "roumeo-e9d79.firebaseapp.com",
  projectId: "roumeo-e9d79",
  storageBucket: "roumeo-e9d79.appspot.com",
  messagingSenderId: "735194890738",
  appId: "1:735194890738:web:ba73da6f90c203f2f1ab6b",
  measurementId: "G-L16ZFG93VY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase firestore reference
const db = firebase.firestore();

// check if name is in local storage

document.querySelector("#name").innerText = name;

if (!localStorage.getItem("name")) {
  name = prompt("What is your name?");
  localStorage.setItem("name", name);
} else {
  name = localStorage.getItem("name");
}

// allow user to chage name

document.querySelector("#change-name").addEventListener("click", () => {
  name = prompt("What is your name?");
  localStorage.setItem("name", name);
  document.querySelector("#name").innerText = name;
});

// form event listener

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let message = document.querySelector("#message-input").value;
  db.collection("messages")
    .add({
      name: name,
      message: message,
    })
    .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      document.querySelector("#message-form").reset();
    })
    .catch((error) => {
      console.error(`Error adding document: ${error}`);
    });
});

db.collection("messages").onSnapshot((snapshot) => {
  document.querySelector("#messages").innerHTML = "";
  snapshot.forEach((doc) => {
    let message = document.createElement("div");
    message.innerHTML = `
    <p class="name">${doc.data().name}</p>
    <p>${doc.data().message}</p>
    `;
    document.querySelector("#messages").prepend(message);
  });
});
