(function(){
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
           var newUser = authResult.user.id;
           console.log(newUser);
		      //	addUser(newUser);
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },

        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'home.html',

        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
          provider : firebase.auth.EmailAuthProvider.PROVIDER_ID,
    
          customParameters: {
            // Forces password re-entry.
            auth_type: 'reauthenticate'
          }
        },


          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
              'https://www.googleapis.com/auth/contacts.readonly'
            ],
            customParameters: {
              // Forces account selection even when one account
              // is available.
              prompt: 'select_account'
            }
          },


           {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
    },


  ],
        // where you want user to redirect after login
        tosUrl: 'home.html',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
})()

