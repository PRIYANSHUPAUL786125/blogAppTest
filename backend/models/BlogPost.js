const mongoose=require('mongoose');
const blogPostSchema =new mongoose.Schema({
    title:{
       type:String,
       required:[true,'title is required'],
       maxlength:[20,'title should be atmost 20 characters'] 
    },
    content:{
        type:String,
        required:[true,'content is required'],
        maxlength:[50,'content should be atmost 50 characters']
    },
    author:{
        type:String,
        required:[true,'author is required']
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'userId is required']
    }
})
//title, content, author, createdAt
const BlogPost=mongoose.model('BlogPost',blogPostSchema);
module.exports=BlogPost;