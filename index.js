const express=require("express");
const app= express();
const path=require("path");
const {v4:uuidv4}= require("uuid");
const methodOverride= require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/view"));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
const port=3000;


//Implementing the first api
let posts= [
    {
        id: uuidv4(),
        username: "stranger",
        content: "something something",
    },
    {
        id: uuidv4(),
        username: "keshari",
        content: "something something",
    },
    {
        id: uuidv4(),
        username: "yush",
        content: "something something",
    }, 
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//Implementing the second Api POST : It consists of two routes , 1-> GET to redirect to form , 2-> POST to add new post to main page
//Creating GET route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//Creating POST route
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id , username , content});
    // console.log(posts);
    // res.send("posts is being added");
    //redirecting to first route
    res.redirect("/posts");
});

//Implementing the third api GET: /posts/:id
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    console.log(posts);
    let post = posts.find((p)=> id==p.id);
    console.log(post);
    res.render("show.ejs",{post});
});

//
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    console.log(newcontent);
    let post = posts.find((p)=> id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

//
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id==p.id);
    res.render("edit.ejs",{post});
});

//
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts = posts.filter((p)=> id!==p.id);
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`Listening on port number :${port}`);
});