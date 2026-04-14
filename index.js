const express=require("express")
const app=express()

const port= 8080

const path=require("path")

const methodOverride=require("method-override")

const{v4: uuidv4}=require('uuid')


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(methodOverride('_method'))


app.listen(port,(req,res)=>{
    console.log(`server is working on port ${port}`)
})



let posts=[
    {
        username:"apnacollege",
        content:"be hardworking!!",
        id:uuidv4()
    },
     {
        username:"nitya",
        content:"i love coding!!",
         id:uuidv4()

    },
     {
        username:"shradha",
        content:"welcomeback to  apna college!",
         id:uuidv4()
    }
]


//**********index route********************************************************************************************************** */

app.get("/posts",(req,res)=>{

    res.render("index.ejs",{posts})
})



//************************** */ create new post*************************
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

// ***** app.get se form serve krke user se info leke app.post me send krke array me wo data push kr diye and res.redirect se  posts means All posts pe redirect kr diye isse changes bhi dikhne lgenge.... 
app.post("/posts",(req,res)=>{

    console.log(req.body)

    let id=uuidv4()

    let {username,content}=req.body
    posts.push({id,username,content})
    res.redirect("/posts")

})


// ************see each posts in detailed by using id id should be unique****************************************************************************************


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params
    console.log(id)
    let post=posts.find((p)=>id===p.id) // array ka find function in js hai read on internet......
    console.log(post)
    res.render("show.ejs",{post})
})

//****************update route update any content by id**************************************************************************************************************** */

// NOTE= jitni baaar iss code me change krenge utni baar id reset hogi so ussi new id se hi hoppcocth pe req send krenge:::>>>>>>>>>>>>>>>>>>>>
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params // id lena from query
    console.log(id)
    let newContent=req.body.content // req.body object ka content key ko set as newContent
     let post=posts.find((p)=>id===p.id) //uss post array ke id ke post ko dhundhna
     post.content=newContent // uss post ke content me
     console.log(newContent) //print new content

     console.log(post) 
    res.redirect("/posts")
})


// ***********edit post by serving edit form*****************************************************************************************************************************

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})


// ****************************Delete rout to delete specific post******************************************************************************

// NOTE: js me event listener me axeos ka use krke kafi bda ho jayega so we will use form>>>>>>>>>>>>>>>>>>>
// NOTE:  array ke filter fuc ka use  id jinke brabaer nhi hai posts me sirf whi bachega baki jiske braaber wo delete ho jayega>>>>>>>>>>>>>> 

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params
    // let post=posts.find((p)=>id===p.id)
     posts=posts.filter((p)=>id!=p.id)

    res.redirect("/posts")
})