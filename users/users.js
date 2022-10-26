//adding dependencies
const fs = require('fs')
//readingfile
let users = fs.readFileSync('users.json', 'utf-8')
users = JSON.parse(users)

//geting all users
const listUsers = () => {
  return users
}
//getting single user
const getUser = userId => {
  userId = Number(userId)
  return users.find(user => user.id === userId)
}
//creating new user
const addUser = user => {
  users.push(user);
  console.log(user);
  fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');
  return 'SUCCESS: user added';
}

//deleting a user
const deleteUser=(userId)=>{
   userId=Number(userId)
   users=users.filter(user=>user.id!==userId);
   fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');

   return 'deleted';
}

//edit user using patch

const editUser=(userId,body)=>{
   userId=Number(userId);
   users.find(user=>
      {
         if(user.id===userId){
            user.id=body.id?body.id:user.id;
            user.name=body.name?body.name:user.name;
            user.profession=body.profession?body.profession:user.profession;
         }
      }
        
      )
      fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');
return "updated";   
   }
//edit user using put
const updateUser=(userId,body)=>{
   userId=Number(userId);
   users.find(user=>
      {
         if(user.id===userId){
            user.id=body.id?body.id:user.id;
            user.name=body.name?body.name:user.name;
            user.profession=body.profession?body.profession:user.profession;
         }
      }
        
      )
      fs.writeFileSync('users.json', JSON.stringify(users), 'utf-8');
return "updated";   
   }
module.exports = {listUsers, getUser, addUser,deleteUser,editUser,updateUser}
