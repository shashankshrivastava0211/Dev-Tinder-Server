Installed postman installed app and listens now routing

#this is a advance routing where c is option it will also run at route "ac" as b is optional here
app.get("/ab?c", (req, res) => {
res.send("a?bc");
});

app.get("/ab+c)=> this means i can write as many b as i want
app.get("/ab\*cd)=>in between anything

dynamic routing & regex routing
app.use("/user/:userid/:name/:structure")
