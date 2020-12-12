const Pool = require('pg').Pool
const session = new Pool({
  user: 'kaylalarson',
  host: 'localhost',
  database: 'session_search',
  password: 'root',
  port: 5432,
});

const getSessions = () => {
  console.log('getting session', session)
  return new Promise(function(resolve, reject) {
    session.query('SELECT * FROM session', (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows);
    })
  })
}

const createSession = (body) => {
  return new Promise(function(resolve, reject) {
    const { user_first_name, user_email } = body;
    session.query('INSERT INTO session (user_first_name, user_email) VALUES ($1, $2) RETURNING * ', [user_first_name, user_email], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new session has been added: ${results.rows[0]}`)
    })
  })
}

const deleteSession = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    session.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Session deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getSessions,
  createSession,
  deleteSession,
}
