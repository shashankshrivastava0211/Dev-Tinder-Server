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
compound indexes like or and and can be user=d in miongodb
like $or
schema pre is a miidleware given to use by miongodb only to add a check at shchema lecvel basically this function is called before asaving any documebnt ud coolrction
to check two different object id we use equals as they are not string
putting indexes in databases i have sent three connection request if there are 1000 people in app and people are sending 100 request our connection request 100000 request this will be rtough to find as when data grows questy will get slow as finding it will be difficulot as there ase to be index to find the datab in databasw wif there arew many fdocumentns
iwe can index are databaswin certain way such that role of a index :=>
suppose 1million records suppose there are 100 people with name virat i want to find user with the susername search query y first name ius dtbase will tall of time to recierr db will have to go to each entyr to check is he virat is he virat and will the databa back
if created index on firstnamew then the query eil become verry fadt whenver i am as iuinf=ex
if your schema has somwthing as unique yiyr datavaw swukjk automaticall y make it index:true
but unique indexes are much faster
making unncessary indexes also anot a good question db has to store data such that your quetry 
databbes are built using trees
$or and inverse query
schema.("pre")
schea.index()
always think abput corner cases and also think of making ur api's secrure now we will learn abpurt creating refernces and also howb to populate those connection
set cookie in frontend
