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

error handling=> use try catch block
throw new error
server is not able to read json data as i am senidng in raw from postman but when i am sending it i need a middleware to convert it in javascript object
that middleware is json
//as this will automatically make it as findByIdAndDelete({\_id:id}); findbyid and delete
any data which is not in schema will get ignored
Done CRUD through postman
now using validator library to validate data
validator se hamne schema ko validate kra
never trust req.body (attacker can send anything in req.body)
flow of signup api
validate api, hash password

now making sure if youare not login you can access database in any way or prform any operation
res.cookie("token", "bacsnbdskjbndek"); //sending cookie from here so that it can be accessible

jwt token => header, payload, signature
steps for token validation is first create a hash password using
Object.Keys=
enum are created when u want to restrict user for a perticual values
in that case in a an array we use enums
