angular.module('someklone.controllers', [])

.controller('HomeCtrl', function($scope, $state, Posts, $q) {
    Posts.following().then(function(data)
        {
            $scope.posts = data;
        }
    );

    $scope.toggleLike = function(post)
    {
        Posts.toggleLike(post);
    }

    $scope.comment = function(post)
    {
        $state.go('comment', { postId: post.id });
    }
})

.controller('BrowseCtrl', function($scope, $state, Posts, $q) {

     Posts.following().then(function(data)
        {
            $scope.posts = data;
        }
    )

    $scope.activateSearch = function()
    {
        $state.go('tab.browse-search');
    }

    $scope.browseDetail = function(id)
    {
        $state.go('tab.browse-detail', { id: id });
    }

})

.controller('BrowseDetailCtrl', function($scope, $stateParams) {
    console.log($stateParams);
})

.controller('SearchCtrl', function($scope, $state, $ionicHistory, Users, $q, Posts) {

    Users.searchUser().then(function(data){
        $scope.otherUsers = data;
    });

    Posts.searchTag().then(function(tagname){
        $scope.posts = tagname;
    });


    $scope.input = {
        searchText: ""
    };

    $scope.searchResults = {
        people: [],
        tags: []
    };

    $scope.tabs = {
        people: false,
        tags: true
    };

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go('tab.browse');
    };

    $scope.emptySearch = function()
    {
        $scope.input.searchText = "";
    };

    $scope.tabActivate = function(tab)
    {
        for (var k in $scope.tabs) {
            if ($scope.tabs.hasOwnProperty(k))
            {
                $scope.tabs[k] = false;
            }
        }
        $scope.tabs[tab] = true;
    };

    $scope.updateSearch = function()
    {

        if($scope.tabs.people == true)
        {
            Users.searchUser($scope.input.searchText).then(function(result) {
                $scope.searchResults.people = result;
            });
        }
        else if($scope.tabs.tags == true)// search for posts with tags
        {
             Posts.searchTag($scope.input.searchText).then(function(result) {
                $scope.searchResults.tags = result;
            });
        }
    };
})

.controller('PostCtrl', function($scope, $state, $ionicHistory, $ionicPlatform, $cordovaCamera, $ionicScrollDelegate) {

    $scope.tabs = {
        gallery: true,
        photo: false,
    };

    $scope.imageData = {
        gallery: {}
    };

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    };

    $scope.photo = function()
    {
        $scope.tabs.photo = true;
        $scope.tabs.gallery = false;

        var options =  {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE
        };

        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageUri) {
                $scope.imageData.picture = imageUri;
                // go immediately to post sending from photo taking
                $state.go('post-confirm', { imageUri: $scope.imageData.picture });
                }, function(err) {
                    // error should be handled here
            });
        });
    };

    $scope.gallery = function()
    {
        $scope.tabs.photo = false;
        $scope.tabs.gallery = true;

        // fetch photos from "Camera" album - this works in Android, not tested with iOS
        // galleryAPI provided by https://github.com/subitolabs/cordova-gallery-api
        galleryAPI.getMedia("Camera", function(items) {
            console.log(items);

            $scope.imageData.gallery.photos = items.filter(function(i){  // filter out images, which do not have thumbnail
                if(i.thumbnail_id != 0) // the id will be zero for images, which do not have thumbnails
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    };

    $scope.selectGalleryImage = function(photo)
    {
        $scope.imageData.picture = "file://" + photo.data;
        $ionicScrollDelegate.scrollTop();
    };

    $scope.confimPost = function()
    {
        // pass the picture URI to the confirm state
        $state.go('post-confirm', { imageUri: $scope.imageData.picture });
    };

    $scope.gallery(); // execute gallery when the controller is run first time

    $scope.uploadPhoto = function()
    {
      var options = new FileUploadOptions()
      options.fileKey = "image";

      $cordovaFileTransfer.upload('https://instagram-mip.herokuapp.com/upload', $scope.imageData.picture, options).then(function(result) {
          console.log("File upload complete");
          console.log(result);
          $scope.uploadResults = "Upload completed successfully";
      }, function(err) {
          console.log("File upload error");
          console.log(err);
          $scope.uploadResults = "Upload failed";
      }, function (progress) {
          // constant progress updates
          console.log(progress);
      });
    }

})

.controller('PostConfirmCtrl', function($scope, $state, $stateParams, $ionicHistory, Posts, Users){
    $scope.userData = Users.getActiveUser();
    $scope.post = {
        imageUri: $stateParams.imageUri,
        caption: "",
        tags: []
    };

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('post');
    };

    $scope.sharePost = function()
    {

      //  var options = new FileUploadOptions()
      //  options.fileKey = "imageUri";
       //0
      //  $cordovaFileTransfer.upload('https://instagram-mip.herokuapp.com/upload', $stateParams.imageUri, options).then(function(result) {
      //     console.log("File upload complete");
      //     console.log(result);
      //     $scope.uploadResults = "Upload completed successfully";
      //  }, function(err) {
      //     console.log("File upload error");
      //     console.log(err);
      //     $scope.uploadResults = "Upload failed";
      //  }, function (progress) {
      //     // constant progress updates
      //     console.log(progress);
      //  });
        Posts.new($scope.post.imageUri, $scope.post.caption, $scope.post.tags).then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.home');
        });
    };


})

.controller('ActivityCtrl', function($scope, Users, Posts) {
    $scope.activity = Users.getActiveUserActivity();
    $scope.tag =  {
                    name : ""
                  };
                  //
    $scope.searchByTag = function(){

      Posts.searchTag( $scope.tag.name );
    };

})

.controller('AccountCtrl', function($scope, Users, Posts, $q, $state, $ionicHistory) {

    $scope.userData = Users.getActiveUser();


    Posts.getUserPosts($scope.userData.id).then(function(results){
        $scope.posts = results;
    });

})

.controller('PostCommentCtrl', function($scope, $stateParams, Users, Posts, $ionicScrollDelegate, $ionicHistory, $state) {
    $scope.comment = { text: "" };
    Posts.getCommentsForPost($stateParams.postId).then(function(data) {
        $scope.comments = data;
        $ionicScrollDelegate.scrollBottom();
    });

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    };

    $scope.addComment = function()
    {
        Posts.addCommentToPost($stateParams.postId, $scope.comment).then(function(){
            $ionicScrollDelegate.scrollBottom(true);
            $scope.comment = "";
            console.log($scope.comment);
        });
    }
})

.controller('LoginCtrl', function($scope, Users, $ionicPopup, $ionicHistory, $state) {
    $scope.user = {
        username: "",
        password: ""
    }

    $scope.login = function()
     {
    Users.login($scope.user.username, $scope.user.password).then(function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.home');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Login fail',
        template: 'Incorrect username or password'
      });
    });
  }

    $scope.moveToSignup = function (){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('signup');
    }
})

.controller('SignupCtrl', function($scope, Users, $ionicPopup, $ionicHistory, $state) {
    $scope.user = {
        username: "",
        name: "",
        password: ""
    }

    $scope.signup = function()
     {
    Users.signup( $scope.user.username,
                  $scope.user.name,
                  $scope.user.password).then(function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('login');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Login fail',
        template: 'Incorrect username or password'
      });
    });
  }
});
