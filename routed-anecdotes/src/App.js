import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import {
  Container, Table, Grid, Image,
  Button, Form, Segment, Divider,
  Header
} from 'semantic-ui-react'

const Menu = () => {
  /* const menuStyle = {
    backgroundColor: 'darkturquoise'
  } */
  const active = {
    fontWeight: 'bold',
    fontSize: 30
  }
  return (
    <Segment padded inverted color='teal'>
      <div /* style={menuStyle} */>
        <Grid celled internally>
          <Grid.Row>
            <Grid.Column width={5}>
              <NavLink exact to='/'
                activeStyle={active}>anecdotes</NavLink>&nbsp;
            </Grid.Column>
            <Grid.Column width={5}>
              <NavLink to='/create' 
                activeStyle={active}>create new</NavLink>&nbsp;
            </Grid.Column>
            <Grid.Column width={5}>
              <NavLink to='/about' 
                activeStyle={active}>about</NavLink>&nbsp;
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Segment >
  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as='h2' attached='top'>Anecdotes</Header>
    <Table striped celled attached>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link
                to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (<div>
    <Header as='h2' attached='top'>{anecdote.content} by {anecdote.author}</Header>
    <Segment attached>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </Segment>
  </div>)

}

const About = () => (
  <div>
    <Header as='h2' attached='top'>About anecdote app</Header>
    <Segment attached>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
          </Grid.Column>
          <Grid.Column>
            <Image src='/turing.jpg' size='medium' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Header as='h2' attached='top'>create a new anecdote</Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>content</label>
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>url for more info</label>
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Field>
            <Button primary>create</Button>
          </Form>
        </Segment>
      </div>
    )

  }
}

class Notification extends React.Component {
  render() {
    console.log(`Notification: ${this.props.notification}`)
    const style = {
      color: 'green',
      border: 'solid',
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      margin: 5
    }
    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `added ${anecdote.content}`
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  }

  anecdoteById = (id) => {
    return this.state.anecdotes.find(a => a.id === id)
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notif = () => {
    return (
      this.state.notification !== ''
        ? <Notification notification={this.state.notification} />
        : ''
    )
  }

  render() {

    console.log(this.anecdoteById('1'))

    return (
      <div>
        <Container >
          <Header as='h1' attached='top'>Software anecdotes</Header>
          <Segment padded attached>
            <Router>
              <div>
                <div>
                  <Menu />
                  {this.notif()}
                </div>
                <Route exact path='/' render={() => <AnecdoteList
                  anecdotes={this.state.anecdotes} />} />
                <Route path='/create' render={({ history }) => <CreateNew
                  addNew={this.addNew}
                  history={history}
                />} />
                <Route path='/about' render={() => <About />} />
                <Route exact path="/anecdotes/:id" render={({ match }) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
                />
              </div>
            </Router>
            <Divider section />
            <Footer />
          </Segment>

        </Container>


      </div>
    );
  }
}

export default App;
