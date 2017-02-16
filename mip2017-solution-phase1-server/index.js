var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 8200));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Home loading


var posts = [
        {
            id: 0,
            user: {
                id: 1,
                username: "jasonstatham",
                profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg" 
            },                                                 
            image: "http://www.students.oamk.fi/~t5homi00/images/jason1.jpg",
            imageThumbnail: "http://www.students.oamk.fi/~t5homi00/images/jason1.jpg",
            likes: 892, 
            caption: "Prepare for my new movies!",
            tags: ['mechanics'],         
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "selenagomez"
                    },                    
                    comment: "I am really hyped for that! #newStatham",
                    userRefs: [],
                    tags: ["newStatham"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "edsheeran"
                    },                    
                    comment: "Me too @selenagomez",
                    userRefs: ["selenagomez"],
                    tags: []       
                },
            ]

        }
    ]

//Other users


var otherUsers = [
    {
        id: 1,
        username: "jasonstatham",
        fullname: "Jason Statham",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg",
    },
    {
        id: 2,
        username: "selenagomez",
        fullname: "Selena Gomez",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/selena.jpg"
    },
    {
        id: 3,
        username: "edsheeran",
        fullname: "Ed Sheeran",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/edsheeran.jpg"
    }
]

// Here is the database about username, password, profileImage, and name
var users = [
    {
        id:"a9dm85",
        username: "thangho",
        password: "123456",
        name: "Jason Statham",
        profileimageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg",
    }   
];

app.get('/', function(req, res) {
    res.send("Hello world");
});

app.post('/', function(req,res) {
    res.send("Hello!");
});
app.post('/login', function(req,res){
    console.log("test");
    console.log(req.body);


    
    var u = users.find(function(element){

        return (element.username === req.body.username) && (element.password === req.body.password);        
    });

    if(u !== undefined)
    {
        return res.json({id: u.id, username: u.username});
    }
    else
    {
        return res.sendStatus(401);
    }
});

app.get('/posts/relevant', function(req, res) {
    res.json(posts);
});

app.get('/posts/:id', function(req, res) {    
    res.json(posts[req.params.id]);
});


// Home Connection
var following = function()
{
    return posts;
}

app.get('/posts', function (req, res) {
    res.json ( following() );
});




// End of Home Connection
app.listen(8200, function() {
        console.log('Node app is running ');
});




// start listening for incoming HTTP connections
// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
// });


