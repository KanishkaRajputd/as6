const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());

const Connect=()=>
{
return mongoose.connect(
    "mongodb+srv://KanishkaRajput:khushy1234@cluster0.516ub.mongodb.net/Liabrary?retryWrites=true&w=majority"
)
}


const bookSchema=new mongoose.Schema({
    name:{type:String,required:true},
    sectionId:{type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true,
        }
},
{
    versionKey:false,
    timestamps:true,
});
  
const Book=mongoose.model("book",bookSchema);

//user schema
const userSchema=new mongoose.Schema({

firstname:{type:String, required:true},
lastname:{type:String,required:true},

},{
    timestamps:true,
    versionKey:false
}) 

const User=mongoose.model("user",userSchema);

//section schema
const sectionSchema=new mongoose.Schema({
secname:{type:String,required:true},
bookId:[{type:mongoose.Schema.Types.ObjectId,
ref:"book",
required:true
}]

},
{
    timestamps:true,
    versionKey:false
}
    )

    //section model
    const Section=mongoose.model("section",sectionSchema)


//authorSchema
const authorSchema=new mongoose.Schema({

firstname:{type:String,required:true},
lastname:{type:String,required:true},

bookId:{type:mongoose.Schema.Types.ObjectId,
ref:"book",
required:true
}

},{
    timestamps:true,
    versionKey:false
})

//authormodel
const Author=mongoose.model("author",authorSchema);


//bookauthorSchema
const bookauthorSchema=new mongoose.Schema({

bookId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"book",
    required:true,

},
authorId:{

type:mongoose.Schema.Types.ObjectId,
ref:"author",
required:true
}

},{
    timestamps:true,
    versionKey:false
})

//bookauthermodel
const BookAuthor=mongoose.model("bookauthor",bookauthorSchema);

//checkoutSchema
const checkOutSchema=new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"user",
required:true
},
bookId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"book",
    required:true
},
}
,{
    timestamps:true,
    versionKey:false
})

//checkOutmodel
const CheckOut=mongoose.model("checkOut",checkOutSchema);




app.get("/author/:firstname",async(req,res)=>{
    try{
    const books= await Author.find({firstname:req.params.firstname}).populate(
        {
            path:"bookId",
            select:{name:1}
        }
    )
    .lean()
    .exec();
    
    return res.send(books);
}
catch(err){
return res.send("Something went wrong..........")
}
});



app.get("/section/:secname",async(req,res)=>{
    try{
    const books= await Section.find({secname:req.params.secname}).populate(
        {
            path:"bookId",
            select:{name:1}
        }
    )
    .lean()
    .exec();
    
    return res.send(books);
}
catch(err){
return res.send("Something went wrong..........")
}
});




app.post("/books/",async(req,res)=>{
try{
const book =await Author.create(req.body);
return res.send(book);
}
catch(err){
    return res.send(err);
}
});

// app.get("/books",async(req,res)=>{
// try{

// const  books=await Author.find().populate({
//     path:"userId",
//     select:{firstname:1,lastname:1}
// }

// )
// .lean()
// .exec();
// return res.send(books);
// }
// catch(err)
// {
//     res.send(err);
// }
// });

app.listen(4557,async()=>{
    try{
      await Connect();
      console.log("i am porting 4557");
    }catch(err){
        console.log(err);
    }
});

