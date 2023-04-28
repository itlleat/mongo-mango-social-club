// Dependencies



// User model

// *Username*

// string

// unique

// required

// trimmed


// *Email*

// string

// unique

// required

// must match a valid email - look into mongoose matching validation


// *Thoughts*

// array of _id values referencing the Thought model


// *friends* 

// array of _id values referencing the User model - self -reference 

// Schema Settings:

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.