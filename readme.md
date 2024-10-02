Installed postman installed app and listens now routing

#this is a advance routing where c is option it will also run at route "ac" as b is optional here
app.get("/ab?c", (req, res) => {
res.send("a?bc");
});

app.get("/ab+c)=> this means i can write as many b as i want
app.get("/ab\*cd)=>in between anything

dynamic routing & regex routing
app.use("/user/:userid/:name/:structure")

ek tcp bnta hai jop gateway rehta hai isiliye ek baar res.send ho hya tcp bnd ho jayega uske bd next chelag but error aayega can not set headers when it is already sent to client for example =?
app.use("user/,(req,res)=>{
console.log("hi)
next()
res.send("response 1 ")==>this line will give error as js make new content for next and new function it has already shared response and now tcp gateway is closef u can not add header after it
},(req,res)=>{
res.send("response 2 is sent")
})

middlewares

when you triggers a API it goes in a middleware chamge until it finds the route which thr api is related to
app.use() vs app.all()
