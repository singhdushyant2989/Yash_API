// Register
// Login
// View Profile
// Change Password
// Address - Add View Update
// Cart - Add View Delete Update

// multer - For Image Upload

require('./src/config/mongodb');
const express = require('express');
const mongodb = require('mongodb');
const user = require('./src/models/user');
const b_address = require('./src/models/b_address');
const s_address = require('./src/models/s_address');
const cart = require('./src/models/cart');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : true}));

// Home Page Check
app.get('',(request,response) => {
    response.send("Server is working fine !!");
})

// User API Starts here
// Add User
app.post('/add-user', async(request,response) => {
    const data = user ({
        'email' : request.body.email,
        'password' : request.body.password
    });

    var userData = await user.findOne({"name" : request.body.email});

    if(userData) {
        var arr = {
            'status' : false,
            'message' : "Oops, Email Already Register !!",
            'data' : userData
        };
    } else {
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Account Created !!',
            'data' : userData
        };
    }

    response.send(arr);
});

// Update User

app.put('/update-user/:email', async (request,response) => {
    
    const data = {
        'name' : request.body.name,
        'email' : request.body.email,
        'mobile_number' : request.body.mobile_number,
        'main_address' : request.body.address
    };

    const updateData = await user.updateOne({'email' : request.params.email},{ $set : data});
    if(updateData.modifiedCount != 0) {
        var arr = {
            'status' : true,
            'message' : 'Record Updated Successfully !!'   
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!'
        };
    }

    response.send(arr);

});

// User API ends here

// Billing Address API starts here

app.post('/update-billing-address/:id', async (request,response) => {
    // let userData = await user.findOne({'_id' : new mongodb.ObjectId(request.params.id)});
    
    let billing_address = await b_address.findOne({'userID': request.params.id});

    var data = b_address ({
        'bill_name':request.body.name,
        'bill_email':request.body.email,
        'bill_mobile':request.body.mobile_number,
        'bill_address':request.body.address,
        'bill_country':request.body.country,
        'bill_state':request.body.state,
        'bill_city':request.body.city,
        'bill_pin':request.body.pin,
        'userID':request.params.id
    })

    if(billing_address){
        const deleteData = await b_address.deleteOne({'userID' : request.params.id});
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Billing Address Updated successfully !!'
        };
    } else {
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Billing Address Added Successfully !!'
        };
    }

    // await data.save();

    // var arr = {
    //     'status' : true,
    //     'message' : 'Billing Address Updated Successfully !!'
    // }

    response.send(arr);
})

// View Billing Address

app.get('/view-billing-address/:id', async (request,response) => {
    let userData = await b_address.findOne({'userID': request.params.id});
    if(userData) {
        var arr = {
            'status' : true,
            'message' : 'Record Found Successfully !!',
            'data' : userData
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!',
            'data' : userData
        }
    }

    response.send(arr);
})

// Billing Address API ends here

// Shipping Address API starts here

app.post('/update-shipping-address/:id', async (request,response) => {
    // let userData = await user.findOne({'_id' : new mongodb.ObjectId(request.params.id)});
    
    let shipping_address = await s_address.findOne({'userID': request.params.id});

    var data = s_address ({
        'ship_name':request.body.name,
        'ship_email':request.body.email,
        'ship_mobile':request.body.mobile_number,
        'ship_address':request.body.address,
        'ship_country':request.body.country,
        'ship_state':request.body.state,
        'ship_city':request.body.city,
        'ship_pin':request.body.pin,
        'userID':request.params.id
    })

    if(shipping_address){
        const deleteData = await s_address.deleteOne({'userID' : request.params.id});
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Shipping Address Updated successfully !!'
        };
    } else {
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Shipping Address Added Successfully !!'
        };
    }

    // await data.save();

    // var arr = {
    //     'status' : true,
    //     'message' : 'Shipping Address Updated Successfully !!'
    // }

    response.send(arr);
})

// View Shipping Address

app.get('/view-shipping-address/:id', async (request,response) => {
    let userData = await s_address.findOne({'userID': request.params.id});
    if(userData) {
        var arr = {
            'status' : true,
            'message' : 'Record Found Successfully !!',
            'data' : userData
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!',
            'data' : userData
        }
    }

    response.send(arr);
})

// Shipping Address API ends here

// Cart API Starts here
// Add Item to Cart
app.post('/add-items/:id',async (request,response) => {
    // const userData = await user.findOne
    const data = cart ({
        // "productID" : request.body.product_id,
        "quantity" : request.body.quantity,
        "userID" : request.params.id
    });
    await data.save();
    var arr = {
        'status' : true,
        'message' : "Product Added to Cart Successfully !!",
        'data' : data
    }

    response.send(arr);
})

// View Items in Cart
app.get('/view-cart/:id', async(request,response) => {
    const cartItems = await cart.find({"userID" : request.params.id});
    if(cartItems){
        var arr = {
            'status' : true,
            'message' : 'Item Found !!',
            'data' : cartItems
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Item Found !!',
            'data' : cartItems
        };
    }

    response.send(arr);
})

// Update Items in Cart

app.patch('/update-cart/:id',async(request,response) => {

    // console.log(request.params.id)
    const data = cart ({
        "quantity" : request.body.quantity
    });
    const updateItem = await cart.updateOne({'_id': new mongodb.ObjectId(request.params.id)},{ $set : data});

    var arr = {
        'status' : true,
        'message' : 'Record Updated Successfully !!',
        'data' : updateItem
    }

    response.send(arr);
})


// Cart API Ends here
app.use((request,response,next) => {
    const arr = {
        'status' : false,
        'message' : "Oops, Something went wrong !!"
    }
    response.status(404).send(arr);
});

app.listen(3001);
