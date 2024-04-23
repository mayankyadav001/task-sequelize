let {Sequelize, DataTypes} = require("sequelize")
let express = require("express")
let bodyParser = require("body-parser")
let app = express()
app.use(express.json())
let transport = require('./nodemailer')

let sequelize = new Sequelize(
    'tcs',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

//----------------------Authenticate-------------------//

sequelize.authenticate()
.then(()=>{
    console.log("Database is connected....")
})
.catch((err)=>{
    console.log("Database is not connected")
})

//------------Create a table In object mapping-----------//

let employees = sequelize.define("employees",{
    empid:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    empname: {
        type: DataTypes.STRING,
        allowNull: "false"
    },
    city: {
        type: DataTypes.STRING,
        allowNull: "false"
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: "fales"
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: "fales"
    },
    mNo: {
        type: DataTypes.STRING,
        allowNull: "fales"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: "fales"
    }
});
//---------------Table run ya create/connect karne ke liye--------//

employees.sync()
.then(()=>{
    console.log("table is connected")
})
.catch((err)=>{
    console.log("table is not connected")
})

//--------------------------Get Method------------------------------//

app.get("/apiget", async ( req,res) =>{
    try{
        const result = await employees.findAll()
        res.send(result)
    }catch(err){
        res.send("error",err)
    }
})

//--------------------------Post Method---------------------------//

app.post("/postmayank", (req,res)=>{
    const {empid,empname,city,salary,dob,mNo,email}= req.body 
    employees.create({empid,empname,city,salary,dob,mNo,email})
    .then((result)=> res.send(result))
    .catch((err)=> res.send(err))
})

//---------------------------Put Method---------------------------//

app.put("/:empid", (req, res) =>{
    const empid = req.params.empid;
    const { empname, city, salary, dob, mNo, email } = req.body;
        let update = employees.update({empid: empid}, {empname: empname, city: city, salary: salary, dob: dob, mNo: mNo, email: email }, {new: true})
    .then((result) =>{
        if (result) {
            return res.status(404).send("Employee not found");
        }
        res.send(update);
    })
    .catch((err) => res.status(500).send(err));
})

//--------------------------Patch Method--------------------------//

app.patch("/patchmayank/:empid", (req, res) => {
    const empid = req.params.empid;
    const { empname, city, salary, dob, mNo, email } = req.body;
        try{
            let UPDATE = employees.update({ empname, city, salary, dob, mNo, email }, {where:{empid}})
            res.send(UPDATE)
        }
        catch(err){
            res.send(err)
        }
})

//--------------------------Delete Method-------------------------//

app.delete("/delete", async (req,res)=>{
    let empid = req.query.empid;
    console.log(empid)
    try {
        let result = await employees.destroy({
            where: {empid}
        })
        res.send(result.json)
    } catch (error) {
        res.status(500).send(error);
    }

})


//------------Database server par run karwa liya hai---------//

app.listen(9000, ()=>{
    console.log("Server is connected..")
})































