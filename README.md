# express-NodeJS-server0
 to run the server, I ran 'node express0.js' in the terminal log
 the conditional routing is implemented by conditionally sending responses or passing control to the next route based on the random condition defined in the first route handler for the /foo path.
 The regular expression /^\/user(name)?$/ matches URLs starting with /user, optionally followed by the string "name". This allows it to handle both /user and /username routes.
 Route parameters are defined in the route path by a segment of the path with a colon (:), followed by the parameter.
 Express automatically extracts the corresponding values from the URL and makes them available in req.params.username.
 To test my query string functionality, I changed the URL to a query string values, for example:http://localhost:3000/get?food=BunBoHue&country=Vietnam;
 Then I look at the terminal log to see Query String Parameters that return every time I put in new values: Query String Parameters: { food: 'BunBoHue', country: 'Vietnam' }
