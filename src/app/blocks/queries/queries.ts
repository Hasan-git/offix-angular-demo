import gql from 'graphql-tag';



export const ADD_GREETING = gql`
mutation addGreeting($msg: String!) {
    addGreeting(msg: $msg){
      id
      msg
      version
    }
  }
`


export const GREETINGS_QUERY = gql`
query greetings {
    greetings{
      id
      msg
      version
    }
  }
`

export const DELETE_GREETING = gql`
mutation deleteGreeting($id: Int!) {
  deleteGreeting(id: $id)
  }
`


