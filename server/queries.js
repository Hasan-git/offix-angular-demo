const queries =
  `

  mutation changeGreeting {
    changeGreeting(msg: "Hello from GraphQL developer", version: 1){
      msg
      version
    }
  }

  mutation changeGreetingClient {
    changeGreetingClient(msg: "Hello press 300", version:1){
      msg
      version
    }
  }

  mutation addGreeting {
    addGreeting(msg: "hello there"){
      id
      msg
      version
    }
  }

  query greeting {
    greeting(id:1){
      id
      msg
      version
    }
  }

  query greetings {
    greetings{
      id
      msg
      version
    }
  }



`

module.exports = queries
