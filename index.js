const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3300
app.use(express.static(__dirname))
app.use("/images", express.static("images"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const userLogin = mongoose.model("user", new mongoose.Schema({
    name: String,
    email: String,
    password: String,
},
    {
        collection: "userdetails"
    }
))
const userbooknow=mongoose.model("use1",new mongoose.Schema({
    name: String,
    email: String,
    address:String
   },
   {
    collection:"booknow"
   }
))
app.post('/booknow',async(req,res)=>{
    const data=new userbooknow(req.body)
    await data.save()
    res.redirect('/home')
    })
mongoose.connect('mongodb://127.0.0.1:27017/localfit')
    .then(() => console.log("Connection successfull"))
    .catch((err) => {
        console.log("Error in connection" + err.stack)
        process.exit(1)
    })
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existinguser = await userLogin.findOne({ email });
        if (!existinguser) {
            await userLogin.create({ name, email, password });
            res.redirect("/login");

        } else {
            return res.send("User already exist")
        }

    } catch (error) {
        console.error("Failed to register", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userLogin.findOne({ email, password })
        if (!user) {
            return res.send("Invalid User")
        }
        else {
            res.redirect("/home")
        }
    } catch (error) {
        console.error("Failed to Login", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})
const usercontacts = mongoose.model("use", new mongoose.Schema({
    name: String,
    email: String,
    msg: String
},
    {
        collection: "contacts"
    }
))
app.post('/contacts', async (req, res) => {
    const data = new usercontacts(req.body)
    await data.save()
    res.redirect('/home')
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home1.html")
})

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html")
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html")
})

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/contact.html")
})

app.get("/course", (req, res) => {
    res.sendFile(__dirname + "/course.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.get("/services", (req, res) => {
    res.sendFile(__dirname + "/services.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

app.get("/booknow", (req, res) => {
    res.sendFile(__dirname + "/booknow.html")
})
app.listen(port, () => console.log('Server is running in http://localhost:${port}'))