const { mongoose } = require('./db');

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
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
})

const blogSchema=new mongoose.Schema({
    
    title:String,
    content:String,
    authorUsername: String,
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            comment: String,
            date: { type: Date, default: Date.now }
        }
    ],
    pic: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }
})
const usermodel=mongoose.model('user',userschema)
const blogmodel=mongoose.model('blog',blogSchema)
module.exports={usermodel,blogmodel};
