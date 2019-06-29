import gql from 'graphql-tag';



export const ADD_GREETING = gql`
mutation addGreeting($id: String! , $msg: String!) {
    addGreeting(id: $id, msg: $msg){
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
mutation deleteGreeting($id: String!) {
  deleteGreeting(id: $id){
    id
    }
  }
`


