import { useState, useEffect } from 'react'
import './App.css'
import { db } from './services/firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"

function App() {
//State a new name and age user
const [newName, setNewName] = useState("")
const [newAge, setNewAge] = useState(0)

const [users, setUsers]= useState([])
const usersColletionRef = collection(db, "users")

//Create a new user
const createUser = async ()=>{
await addDoc(usersColletionRef, { name:newName, Idade:Number(newAge) })
}

//Updade a user
const updateUser = async (id, Idade)=>{
  const userDoc = doc(db, "users", id)
  const newFields = {Idade: Idade + 1}
  await updateDoc(userDoc, newFields)
}

//Delete a user
const deleteUser = async(id)=>{
const userDoc = doc(db, "users", id)
await deleteDoc(userDoc)

}
useEffect(()=>{

  const getusers = async ()=>{
  const data = await getDocs(usersColletionRef)
  setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
  }
  getusers()
  
}, [])
return<div className="App">
  <input type="text" placeholder="Name:"
   onChange={(e)=>{setNewName(e.target.value)}}/>

  <input type="number" placeholder="Age:"
  onChange={(e)=>{setNewAge(e.target.value)}}/>

  <button variant="outlined" onClick={createUser}>Create User</button>

  {users.map((user)=>{return <div>
  <h1>Name: {user.name} </h1>
  <h1>Age: {user.Idade}</h1>
  <button onClick={()=>{updateUser(user.id, user.Idade)}}>Increase Age</button>
  <button onClick={()=>{deleteUser(user.id)}}>Delete user</button>
</div>})}</div>
}

export default App
