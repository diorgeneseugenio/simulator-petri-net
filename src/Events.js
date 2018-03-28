import React, {Component} from 'react'

import Container from './Container'
import Row from './Row'
import FormGroup from './FormGroup'

class Events extends Component{
  constructor(props){
    super(props)

    this.state = {
      name: '',
      age: '',
      email: '',
      data: []
    }

    this.updateInputName = this.updateInputName.bind(this)
    this.updateInputAge = this.updateInputAge.bind(this)
    this.updateInputEmail = this.updateInputEmail.bind(this)
    this.clickEvent = this.clickEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }



  updateInputName = (e) => {
    return this.setState({
      name: e.target.value
    })
  }

  updateInputAge(e){
    return this.setState({
      age: e.target.value
    })
  }

  updateInputEmail(e){
    return this.setState({
      email: e.target.value
    })
  }

  clickEvent(e){
    this.state.data.push({
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    })

    return this.setState({
      name: '',
      age: '',
      email: ''
    })

  }

  deleteEvent(item){
    const newState = this.state.data
    if(newState.indexOf(item) > -1){
      newState.splice(newState.indexOf(item), 1)

      this.setState({
        data: newState
      })
    }
  }

  render(){
    const { data } = this.state.nodes
    const itens = data.map((item) => {
        return (
              <tr key={item}>
                <td>{item.name.toString()}</td>
                <td>{item.age.toString()}</td>
                <td>{item.email.toString()}</td>
                <td><button type="button" className="btn btn-danger" onClick={this.deleteEvent.bind(this, item)}>Delete</button></td>
              </tr>
            )
    })

    return (
      <div>
        <Container id="inputs">
          <Row>
            <FormGroup
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.updateInputName}
              label="Nome"
            />
            <div className="form-group col-sm-3">
              <label htmlFor="age">Idade</label>
              <input type="text" name="age" id="age" className="form-control" value={this.state.age} onChange={this.updateInputAge}/>
            </div>
            <div className="form-group col-sm-3">
              <label htmlFor="email">Email</label>
              <input type="mail" name="email" id="email" className="form-control" value={this.state.email} onChange={this.updateInputEmail}/>
            </div>
            <div className="col-sm-3 text-center align-self-center">
                <button type="button" className="btn btn-primary" onClick={this.clickEvent}>Adicionar</button>
            </div>
          </Row>
        </Container>
        <div className="container" id="datas">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>E-mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { itens }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Events
