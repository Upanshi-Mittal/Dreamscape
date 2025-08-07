const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    name:{type:String ,
        required:true
    },

    email:{type:String ,
        required:true,
        unique:true
    },

    password:{type:String ,
        required:true
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

const blogSchema=new mongoose.Schema({
    
    title:String,
    content:String,
    authorUsername: String,
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            comment: String,
            date: { type: Date, default: Date.now }
        }
    ]
})
const usermodel=mongoose.model('user',userschema)
const blogmodel=mongoose.model('blog',blogSchema)
module.exports={usermodel,blogmodel};