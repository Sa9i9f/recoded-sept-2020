var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/database.db');

var posts = {}

/**
 * Retrieve a single post.
 * {
 *   title: string,
 *   author: string,
 *   date: string,
 *   liked: boolean,
 *   url: string,
 *   body: string
 * }
 */
posts.retrieve = (id, callback) => {
  db.get("SELECT Posts.title, Users.username AS author, Posts.date, Substr(Posts.body, 0, 140) AS excerpt, false AS liked, '/posts/' + Posts.id AS url FROM Posts INNER JOIN Users ON Posts.user_id = Users.id ORDER BY date DESC WHERE Posts.id = ?", (err, row) => {
    if (err) {
      callback(null);
      return;
    }
    // TODO: author, liked
    callback({
      title: row.title,
      author: row.user_id,
      date: row.date,
      liked: false,
      url: "/posts/" + id,
      body: row.body
    });
  });
};

/**
 * Retrieves a list of post excerpts for the most recent posts.
 * {
 *   title: string,
 *   author: string,
 *   date: string,
 *   liked: boolean,
 *   url: string,
 *   excerpt: string
 * }
 */
posts.recent = (callback) => {
  // TODO: liked
  db.all("SELECT Posts.title, Users.username AS author, Posts.date, Substr(Posts.body, 0, 140) AS excerpt, false AS liked, '/posts/' + Posts.id AS url FROM Posts INNER JOIN Users ON Posts.user_id = Users.id ORDER BY date DESC", (err, rows) => {
    if (err) {
      callback([]);
      return;
    }
    callback(rows);
  });
};

/**
 * Retrieves a list of post excerpts for the trending posts.
 * {
 *   title: string,
 *   author: string,
 *   date: string,
 *   liked: boolean,
 *   url: string,
 *   excerpt: string
 * }
 */
posts.trending = (callback) => {
  // TODO: liked
  // TODO: Implement trending sort
  db.all("SELECT Posts.title, Users.username AS author, Posts.date, Substr(Posts.body, 0, 140) AS excerpt, false AS liked, '/posts/' + Posts.id AS url FROM Posts INNER JOIN Users ON Posts.user_id = Users.id ORDER BY date DESC", (err, rows) => {
    if (err) {
      callback([]);
      return;
    }
    callback(rows);
  });
};

/**
 * Creates a new Post with the given title and message.
 *
 * The callback takes a single parameter:
 * {
 *   success: boolean,
 *   post_id: number,
 *   error_message: string
 * }
 * redirect_uri will always be defined when success is true.
 * error_message will always be defined when success is false.
 * redirect_uri must only be used when success is true.
 */
posts.create = (post, user, callback) => {
  var success = true;
  var error_message = "";

  if (post.title.trim().length < 10) {
    error_message = "A post title is required (minimum 10 characters).";
  } else if (post.message.trim().length < 20) {
    error_message = "A post message is required (minimum 20 characters).";
  }

  if (!success) {
    var result = {
      success: false,
      error_message: error_message
    };
    return callback(result);
  }

  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var date = new Date();
  var sql ='INSERT INTO posts (title, body, date, user_id) VALUES (?, ?, ?, ?)'
  var now = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  var params =[post.title, post.message, now, user.id]
  db.run(sql, params, function (err, result) {
    var success = !err;
    var result = {
      success: success,
      error_message: "An unknown error occurred.",
      post_id: this.lastID,
    };
    return callback(result);
  });
};

/**
 * Either upvotes or removes an upvote for the currently logged in user for the
 * Post being displayed.
 *
 * The callback takes no parameters.
 */
posts.upvote = (vote, callback) => {
  callback();
};

module.exports = posts;

