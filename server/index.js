const { app, schema } = require('./server')
const { createSubscriptionServer } = require('./node_modules/@aerogear/voyager-subscriptions')

const port = 4000
app.get('/', (req, res) => res.send('ok'))
const server = app.listen({ port }, () =>{
  console.log(`🚀 Server ready at http://localhost:${port}`)

  createSubscriptionServer({ schema }, {
    server,
    path: '/graphql'
  })
}
)
