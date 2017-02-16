angular.module('someklone.services').factory('Users', function($q) {

    // var activeUser = {
    //         id: 1,
    //         username: "dtrump",
    //         fullName: "Donald Trump",
    //         profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg",
    //         postCount: 13,
    //         followers: 52,
    //         following: 2,
    //         activity: [
    //             {
    //                 userId: 2,
    //                 username: "POTUS",
    //                 fullName: "President of United States",
    //                 profileImageSmall: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg",
    //                 type: "commented",
    //                 comment: "You're never going to make it don #losing",
    //                 userRefs: [],
    //                 tags: ["losing"]
    //             },
    //             {
    //                 userId: 3,
    //                 username: "HillaryC",
    //                 fullName: "Hillary Clinton",
    //                 profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg",
    //                 type: "liked",
    //                 comment: "",
    //                 userRefs: [],
    //                 tags: []
    //             }
    //         ]
    //     };

    // var users = [
    //     {
    //         id: 1,
    //         username: "dtrump",
    //         fullName: "Donald Trump",
    //         profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
    //     },
    //     {
    //         id: 2,
    //         username: "POTUS",
    //         fullName: "President of United States",
    //         profileImageSmall: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg" 
    //     },
    //     {
    //         id: 3,
    //         username: "HillaryC",
    //         fullName: "Hillary Clinton",
    //         profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg" 
    //     }
    // ];

    return {
        searchUser: function(searchWord) {
            
            var upperCaseSearchWord = searchWord.toUpperCase();
            return $q(function(resolve, reject){
                if(searchWord.length > 0)
                {
                    var matches = users.filter(function(u){
                        var testString = u.username.toUpperCase();                        
                        return testString.includes(upperCaseSearchWord);                    
                    });

                    resolve(matches);
                }
                else
                {
                    reject();
                }
            });            
        },
        getOne: function(key)
        {
            return $q(function(resolve, reject){
                for(var i = 0; i < users.length; i++)
                {
                    if(users[i].id == key)
                    {
                        resolve(users[i]);
                    }
                }
                reject();
                
            });
        },
        getActiveUser: function()
        {
            return activeUser;
        },
        getActiveUserActivity: function()
        {
            return activeUser.activity;
        }

    };
})

// This is the login part
.factory('User', function($q, $http, appConfig) {
  
  var user = null;

  return {
    login: function(username, password) {
      return $q(function(resolve, reject){
        $http.post(appConfig.apiAddr + "login", { username: username, password: password}).then(function(result){
          if(result.status == 200)
          {
            user = { id: result.data.id, username: result.data.username };
            resolve();
          }
          else
          {
            reject();
          }
        }).catch(function(){
          reject();
        });
      });
    },
    isLogged: function()
    {
      return $q(function(resolve, reject){
        if(user != null)
        {
          resolve();
        }
        else
        {
          reject();
        }
      });
    }    
  };
});