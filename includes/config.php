<?php
// Session security

ini_set('session.use_only_cookies', 1);  // settings for better session cookie ID generation
ini_set('session.use_strict_mode', 1);

session_set_cookie_params([
    'lifetime' => 1800,       // less lifetime so it reduces chance of the cookie being stolen
    'domain' => 'localhost',  // specific domain for which the cookie would work
    'path' => '/',  // specifying that the cookie should work for every subdomain in the main domain
    'secure' => true,         // specifying the http protocols        
    'httponly' => true
]);

session_start();
if(!isset($_SESSION['last_regeneration'])){   // check if session id has been regenerated already
    session_regenerate_id(true);
    $_SESSION['last_regeneration'] = time();  // if it doesn't, assign the last regeneration as the current time
}else {
    $interval = 60 * 30;   // set to the time we want to regenerate the session id (30 minutes) in seconds
    if(time() - $_SESSION['last_regeneration'] >= $interval){ // we substract the last id regeneration from the current time, the result
        session_regenerate_id(true);                           // will be in seconds which we compare to the interval and if it's more 
        $_SESSION['last_regeneration'] = time();               // or equal to 30 minutes (interval in seconds), we regenerate the id  
    };                                                         // and assign the last regeneration, the current time.
};