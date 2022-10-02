const bcrypts = require('bcryptjs')
const Users =[
    {name:'admin', email:'admin@admin.com', password:bcrypts.hashSync('Ushagupta123#',10),isAdmin:true},
    {name:'sameer', email:'sameergupta4873@gmail.com', password:bcrypts.hashSync('Ushagupta123#',10)},
    {name:'user', email:'sameergupta4874@gmail.com', password:bcrypts.hashSync('Ushagupta123#',10)},
    {name:'sam', email:'sameergupta4875@gmail.com', password:bcrypts.hashSync('Ushagupta123#',10)}
]

module.exports = Users;