import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import { App } from './app'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const app = document.getElementById('app')
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  app,
)
