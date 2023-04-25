// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCwNe26NOyIdQXte14qSf4mLdLH-Zr30cM",
    authDomain: "crud-ab39d.firebaseapp.com",
    databaseURL: "https://crud-ab39d-default-rtdb.firebaseio.com",
    projectId: "crud-ab39d",
    storageBucket: "crud-ab39d.appspot.com",
    messagingSenderId: "178223105778",
    appId: "1:178223105778:web:50047fe741ddf9b0dc326b",
    measurementId: "G-10CSYFZF45"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get elements from the DOM
  const userForm = document.querySelector('#userForm');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const ageInput = document.querySelector('#age');
  const userList = document.querySelector('#userList');
  
  // Get a reference to the Firebase Realtime Database
  const database = firebase.database();
  const usersRef = database.ref('users');
  
  // Event listener for the form submit
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get the values from the input fields
    const name = nameInput.value;
    const email = emailInput.value;
    const age = parseInt(ageInput.value);
  
    // Create a new user object
    const newUser = {
      name: name,
      email: email,
      age: age
    };
  
    // Push the new user object to the database
    usersRef.push(newUser);
  
    // Clear the form
    nameInput.value = '';
    emailInput.value = '';
    ageInput.value = '';
  });
  
  // Event listener for changes in the database
  usersRef.on('value', (snapshot) => {
    // Clear the user list
    userList.innerHTML = '';
     // Loop through each child in the snapshot
  snapshot.forEach((childSnapshot) => {
    // Get the key and data for each child
    const key = childSnapshot.key;
    const childData = childSnapshot.val();

    // Create a list item for the user
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>Name: ${childData.name}</div>
      <div>Email: ${childData.email}</div>
      <div>Age: ${childData.age}</div>
      <button data-key="${key}" class="deleteButton">Delete</button>
    `;

    // Add the list item to the user list
    userList.appendChild(listItem);
  });

  // Event listener for the "click" event on the delete buttons
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const key = e.target.getAttribute('data-key');
      usersRef.child(key).remove();
    });
  });
});