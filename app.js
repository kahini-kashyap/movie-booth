const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
const fs = require("fs");

app.get("/", function (req, res) {
    res.render("index.ejs"
    );
})

var ticket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

app.post("/data", function (req, res) {
    let tickets = req.body.tickets;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let data = fname + " " + lname + " " + email + " " + tickets + "\n";
    if (!fname || !lname || !email || !tickets) {
        return res.json({ message: "Please enter all fields correctly" });
    }
    if (tickets > 10) {
        return res.json({ message: "Please enter the correct number of the ticket(s)" });
    }
    else {
        let ticket_numbers = tickets.split(",");
        for (let i = 0; i < ticket_numbers.length; i++) {
            if(ticket[parseInt(ticket_numbers[i])] == 1){
                return res.json({message: "Ticket already booked"});
            }
            ticket[parseInt(ticket_numbers[i])] = 1;
        }
        fs.appendFile("data.txt", data, function(err){
            if(err){
                console.log(err);
            }
        })
        return res.json({ message: "Ticket Booked" });
    }

   
})
app.get("/live", (req, res) => {
    return res.json({ ticket });
})

app.listen(5000, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server is running");
    }
})