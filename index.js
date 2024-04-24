const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

app.use(cors({
	origin: "*"
}));

function randomize() {
	var arr = [];
	for (let i = 0; i < 7; i++) {
		arr[i] = chars[Math.floor(Math.random() * (chars.length))];
	}
	return arr;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://errfigaymendev:errfigaymendev@cluster0.t72lqss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const schema = new mongoose.Schema({
	id: String,
	link: String,
	redirect: String
})
const m = mongoose.model("shortener", schema);

app.get("/search/:id", (req, res)=>{
	m.findOne({id: req.params.id}).then((data)=>{
		res.send(data);
	});
})

app.post("/add", (req, res)=>{
	var	i = randomize().join("");
	var link = "https://vercel.shortly.com/"+i;
	var data = new m({
		id: i,
		redirect: link,
		link: req.body.link
	});
	data.save();
	res.send(link);
})

app.listen(3000, ()=>{
	console.log("New Connection");
})