import React, { Component } from 'react'

import Container from './Container'
import Row from './Row'
import FormGroup from './FormGroup'
import Button from './Button'
import Table from './Table'
import Col from './Col'
import Select from 'react-select'

class PetriNet extends Component {
  constructor(props){
    super(props)
    this.state = {
      transitionSelected: 0,
      transitionMarkSelected: 0,
      transitions : [],
      nodeSelected: 0,
      nodeMarkSelected: 0,
      nodes : [],
      mark : 0,
      thread : {
          weigth : 0,
          transition : 0
      },
      howManyTransitions : 0,
      howManyTransitionsOld : 0,
      howManyNodes : 0,
      howManyNodesOld : 0
    }
  }

  updateInputHowManyTransitions = (e) => {
    return this.setState({
            howManyTransitions : e.target.value
          })
  }

  updateInputHowManyNodes = (e) => {
    return this.setState({
            howManyNodes : e.target.value
          })
  }

  updateInputMark = (e) => {
    return this.setState({
            mark : e.target.value
          })
  }

  updateInputWeightThread = (e) => {
    return this.setState({
            thread : {
              weigth: e.target.value,
              transition: this.state.thread.transition
            }
          })
  }

  updateInputTransition = (e) => {
    return this.setState({
            thread : {
              transition: e.target.value,
              weigth: this.state.thread.weigth
            }
          })
  }

  clickEventNode = (e) => {
    var nodeCurrent = {
        label : this.state.nodeMarkSelected,
        value : this.state.nodeMarkSelected,
        mark : this.state.mark,
        weigth : this.state.thread.weigth,
        transition : this.state.transitionSelected
    }

    var idNodeCurrent = (this.state.nodeMarkSelected-1)

    this.state.nodes[idNodeCurrent] = nodeCurrent

    var transitionIdCurrent = (this.state.transitionSelected-1)
    var transitionCurrent = this.state.transitions[transitionIdCurrent]

    var newTotalWeight = parseInt(transitionCurrent.totalWeight)+parseInt(nodeCurrent.weigth)

    this.state.transitions[transitionIdCurrent] = {
      label : transitionCurrent.label,
      value : transitionCurrent.value,
      totalWeight: newTotalWeight,
      nodes: transitionCurrent.nodes
    }

    return this.setState({
      nodeMarkSelected: 0,
      transitionSelected : 0,
      mark : 0,
      thread : {
          weigth : 0,
          transition : 0
      }
    })
  }

  clickEventTransition = (e) => {
    var idTransitionCurrent = (this.state.transitionMarkSelected-1)
    var transationCurrent = this.state.transitions[idTransitionCurrent]
    transationCurrent.nodes.push(this.state.nodeSelected)

    return this.setState({
      nodeSelected: 0,
      transitionMarkSelected : 0
    })
  }

  clickEventHowManyTransitions = (e) => {
    var numManyOld = 1*this.state.howManyTransitionsOld;
    var numMany = 1*this.state.howManyTransitions;
    var numTotal = numManyOld+numMany;

    for (var i = numManyOld; i < numTotal; i++) {
      this.state.transitions.push({
        label : i + 1,
        value : i + 1,
        totalWeight: 0,
        nodes: []
      })
    }

    return this.setState({
      howManyTransitionsOld : this.state.howManyTransitions,
      howManyTransitions : 0
    })
  }

  clickEventHowManyNode = (e) => {
    var numManyOld = 1*this.state.howManyNodesOld;
    var numMany = 1*this.state.howManyNodes;
    var numTotal = numManyOld+numMany;

    for (var i = numManyOld; i < numTotal; i++) {
      this.state.nodes.push({
        label : i + 1,
        value : i + 1,
        transition : 0,
        weigth: 0,
        mark : 0
      })
    }

    return this.setState({
      howManyNodesOld : this.state.howManyNodes,
      howManyNodes : 0
    })
  }

  handleChangeTransition = (transitionSelected) => {
    this.setState({ transitionSelected });
  }

  handleChangeNode = (nodeSelected) => {
    this.setState({ nodeSelected });
  }

  handleChangeMarkNode = (nodeMarkSelected) => {
    this.setState({ nodeMarkSelected });
  }

  handleChangeMarkTransition = (transitionMarkSelected) => {
    this.setState({ transitionMarkSelected });
  }

  render(){
    const { nodes } = this.state
    const nodesList = nodes.map((item, i) => {
        return (
              <tr key={i}>
                <td>{(i+1)}</td>
                <td>{item.mark.toString()}</td>
                <td>{item.weigth.toString()}</td>
                <td>{item.transition.toString()}</td>
              </tr>
            )
    })

    const { transitions } = this.state
    const transitionList = transitions.map((item, i) => {
        return (
              <tr key={i}>
                <td>{(i+1)}</td>
                <td>{item.nodes.join(', ')}</td>
                <td>{item.totalWeight.toString()}</td>
              </tr>
            )
    })

    const { transitionSelected } = this.state;
    const valueTransition = transitionSelected && transitionSelected.toString();

    const { nodeSelected } = this.state;
    const valueNode = nodeSelected && nodeSelected.toString();

    const { transitionMarkSelected } = this.state;
    const valueTransitionMark= transitionMarkSelected && transitionMarkSelected.toString();

    const { nodeMarkSelected } = this.state;
    const valueMarkNode = nodeMarkSelected && nodeMarkSelected.toString();

    return(
        <div>
          <Container>
            <Row>
              <div className="col-sm-4">
                <Container id="transitions">
                  <Row>
                    <div className="col-sm-12 title-head-div">
                        <h5> Add - Transitions </h5>
                    </div>
                  </Row>
                  <Row>
                    <FormGroup
                    name="howManyTransitions"
                    id="howManyTransitions"
                    value={this.state.howManyTransitions}
                    label="How Many?"
                    type="number"
                    colClass='col-md-8'
                    onChange={this.updateInputHowManyTransitions}
                    />
                    <Button
                    id='addTransition'
                    text = 'Add'
                    onClick = {this.clickEventHowManyTransitions}
                    colClass = 'col-sm-4'
                    />
                  </Row>
                </Container>
              </div>
              <div className="col-sm-8">
                <Container id="transitions">
                  <Row>
                    <div className="col-sm-12 title-head-div">
                      <h5> Link - Transition</h5>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-sm-4">
                      <label>Transition</label>
                      <Select
                        name="transitions"
                        value={valueTransitionMark}
                        onChange={this.handleChangeMarkTransition}
                        options={this.state.transitions}
                        simpleValue
                      />
                    </div>
                    <div className="col-sm-4">
                      <label>Node</label>
                      <Select
                        name="node"
                        value={valueNode}
                        onChange={this.handleChangeNode}
                        options={this.state.nodes}
                        simpleValue
                      />
                    </div>
                    <Button
                    id='addTransition'
                    text = 'Add'
                    onClick = {this.clickEventTransition}
                    colClass = 'col-sm-2'
                    />
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
              <div className="col-sm-4">
                <Container id="transitions">
                  <Row>
                    <div className="col-sm-12 title-head-div">
                        <h5> Add - Node </h5>
                    </div>
                  </Row>
                  <Row>
                    <FormGroup
                    name="howManyNodes"
                    id="howManyNodes"
                    value={this.state.howManyNodes}
                    label="How Many?"
                    type="number"
                    colClass='col-md-8'
                    onChange={this.updateInputHowManyNodes}
                    />
                    <Button
                    id='addTransition'
                    text = 'Add'
                    onClick = {this.clickEventHowManyNode}
                    colClass = 'col-sm-4'
                    />
                  </Row>
                </Container>
              </div>
              <div className="col-sm-8">
                <Container id="nodes">
                  <Row>
                    <div className="col-sm-12 title-head-div">
                      <h5> Link - Node </h5>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-sm-3">
                      <label>Node</label>
                      <Select
                        name="nodeMark"
                        value={valueMarkNode}
                        onChange={this.handleChangeMarkNode}
                        options={this.state.nodes}
                        simpleValue
                      />
                    </div>
                    <FormGroup
                      name="mark"
                      id="mark"
                      value={this.state.mark}
                      label="Mark"
                      type="number"
                      colClass="col-sm-2"
                      onChange={this.updateInputMark}
                    />
                    <FormGroup
                      name="weigth"
                      id="weigth"
                      value={this.state.thread.weigth}
                      label="Weigth"
                      type="number"
                      colClass="col-sm-2"
                      onChange={this.updateInputWeightThread}
                    />
                    <div className="col-sm-3">
                      <label>Transition</label>
                      <Select
                        name="transition"
                        value={valueTransition}
                        onChange={this.handleChangeTransition}
                        options={this.state.transitions}
                        simpleValue
                      />
                    </div>
                    <Button
                    id='addNode'
                    text = 'Add'
                    onClick = {this.clickEventNode}
                    colClass = 'col-sm-2'
                    />
                  </Row>
                </Container>
              </div>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col
                class="col-sm-8"
              >
                <Table>
                  <thead>
                    <tr>
                      <td>Id</td>
                      <td>Mark</td>
                      <td>Weigth</td>
                      <td>Transition</td>
                    </tr>
                  </thead>
                  <tbody>
                    {nodesList}
                  </tbody>
                </Table>
              </Col>
              <Col
                class="col-sm-4"
              >
              <Table>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Next Node</td>
                    <td>Total Weigth</td>
                  </tr>
                </thead>
                <tbody>
                    {transitionList}
                </tbody>
              </Table>
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}

export default PetriNet
