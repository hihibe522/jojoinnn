var session = require("express-session")
var NedbStore = require('nedb-session-store')( session );
// var FileStore = require('session-file-store')(session);
const sessionMiddleware = session({
    secret: "fas fas",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
    },
    store: new NedbStore({
      filename: 'path_to_nedb_persistence_file.db'
    })
  })

module.exports = sessionMiddleware ;