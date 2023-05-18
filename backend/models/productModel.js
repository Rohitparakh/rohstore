import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      // required: true
    },
    name: {
      type: String,
      // required: true
    },
    rating: {
      type: Number,
      // required: true
    },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const variationSchema = mongoose.Schema(
  {
    color: {
      type: String,
      // required: true
    },
    image: {
      type: String,
      //  required: true
    },
    size: {
      type: Array,
      //  required: true
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    id: {
      type: String,
      //   required: true,
    },
    sku: {
      type: String,
      //   required: true,
    },
    name: {
      type: String,
      //   required: true,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
      //   required: true,
    },
    weight: {
      type: String,
      //   required: true,
    },
    dimensions: {
      type: String,
      //   required: true,
    },
    material: {
      type: String,
      //   required: true,
    },
    otherInfo: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
    discount: {
      type: Number,
      //   required: true,
    },
    offerEnd: {
      type: String,
      //   required: true,
    },
    new: {
      type: Boolean,
      //   required: true,
      default: true,
    },
    reviews: [reviewSchema],
    saleCount: {
      type: Number,
      //   required: true,
    },
    category: {
      type: Array,
      //   required: true,
    },
    tag: {
      type: Array,
      //   required: true,
    },
    variation: [variationSchema],
    image: {
      type: Array,
      required: true,
    },
    shortDescription: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    numReviews: {
      type: Number,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

// import  mongoose  from "mongoose";

// const reviewSchema = mongoose.Schema ({
//     name:{type:String, required: true},
//     rating:{type:Number, required: true},
// comment:{type:String, required: true},
// user:{
//     type: mongoose.Schema.Types.ObjectId,
//     required:true,
//     ref:'User'
// },
// },{
//     timestamps:true
// })

// const productSchema = mongoose.Schema({
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'User'
//     },
//     name: {
//         type:String,
//         required:true
//     },
//     image: {
//         type:String,
//         required:true,
//     },
//     brand: {
//         type:String,
//         required:true
//     },
//     category: {
//         type:String,
//         required:true,
//     },
//     description: {
//         type:String,
//         required:true,
//     },
//     reviews:[reviewSchema],
// rating: {
//     type:Number,
//     required:true,
//     default:0
// },
//     numReviews: {
//         type:Number,
//         required:true,
//         default:0
//     },
//     price: {
//         type:Number,
//         required:true,
//         default:0
//     },
//     countInStock: {
//         type:Number,
//         required:true,
//         default:0
//     },

// },{
//     timestamps: true
// })

// const Product = mongoose.model('Product',productSchema)

// export default Product
