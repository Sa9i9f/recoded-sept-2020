# Day 3

## Part 1: Authentication (Passport.js integration)

**Talking Points:**
- How do we know a user is signed in? [Securely?]
- Introduction to sessions [Limitations?]
- Thinking ahead [Strategies?]

**Application Changes:**
- Integrate Express-Session
- Integrate Passport
- Implement login/logout
- Prevent access to unauthorized endpoints

**Resources:**
- [Why OAuth?](https://www.youtube.com/watch?v=KT8ybowdyr0)
- [http://www.passportjs.org/docs/username-password/](http://www.passportjs.org/docs/username-password/)
- [https://github.com/passport/express-4.x-local-example](https://github.com/passport/express-4.x-local-example)
- [https://www.npmjs.com/package/connect-ensure-login](https://www.npmjs.com/package/connect-ensure-login)
- [http://www.passportjs.org/docs/login/](http://www.passportjs.org/docs/login/)

## Part 2: Data Storage Concepts & Relational Databases

**Talking Points:**
- What data do we store? [Security? Privacy?]
- Special concerns for data stores on the web? [Transactions / ACID? Scalability?]
- Introduction to relational database concepts [Schema, Tables, Rows, Uniqueness, Nullability, CRUD, Queries, Joins, Keys]

**Application Changes:**
- Create a database schema for users and posts

**Resources:**
- [DB Browser for SQLite](https://sqlitebrowser.org/dl/)

## Part 3: Introduction to SQL

**Talking Points:**
- Mapping CRUD to SQL statements [Dangers?]
- Database management SQL [Schema Updates?]

**Application Changes:**
- Integrate the SQLite connector
- Implement the SQLite data store to replace our mocks
- Introduce new View Post URL parameter

**Resources:**
- [sqlite3](https://www.npmjs.com/package/sqlite3)

**Code Snippets**

A useful debugging utility for printing all your SQL queries to the console:

```
db.on('profile', (sql, time) => {
  console.log(sql);
});
```

