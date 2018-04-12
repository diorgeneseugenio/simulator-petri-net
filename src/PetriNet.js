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
      /* LISTS */
      transitions : [],
      nodes : [],
      nodesToTransitions: [],
      transitionsToNodes: [],
      /* CONTROL SELECTED FIELDS */
      transitionSelected: 0,
      transitionLinkSelected: 0,
      nodeSelected: 0,
      nodeMarkSelected: 0,
      nodeLinkSelected: 0,
      /* CONTROL HOW MANY OBJECTS */
      howManyTransitions : 0,
      howManyTransitionsOld : 0,
      howManyNodes : 0,
      howManyNodesOld : 0,
      /* SUPPORT FIELDS */
      mark : 0,
      weigthNode : 0,
      weigthTransition : 0
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
            weigthNode: e.target.value
          })
  }

  updateInputWeightTransition = (e) => {
    return this.setState({
            weigthTransition: e.target.value
          })
  }

  updateInputTransition = (e) => {
    return this.setState({
            transition: e.target.value
          })
  }

  updateNumberTransitions = (e) => {
    var quant = 0
    var nodeId = (e.node-1)

    const { nodesToTransitions } = this.state
    const nodesList = nodesToTransitions.map((item, i) => {
      if(item.node === e.node) quant++
    })

    return(
      this.state.nodes[nodeId] = {
        label : this.state.nodes[nodeId].label,
        value : this.state.nodes[nodeId].value,
        transitions : quant,
        mark : this.state.nodes[nodeId].mark,
      }
    )
  }

  clickEventNode = (e) => {
    var transitionIdCurrent = (this.state.transitionSelected-1)
    var transitionCurrent = this.state.transitions[transitionIdCurrent]

    var idNodeCurrent = (this.state.nodeLinkSelected-1)

    var newNodeToTransition = {
      node : this.state.nodeLinkSelected,
      weigthNode : this.state.weigthNode,
      transition :this.state.transitionSelected
    }

    this.state.nodesToTransitions.push(newNodeToTransition)

    this.updateNumberTransitions({node : this.state.nodeLinkSelected})

    var newTotalWeight = parseInt(transitionCurrent.totalWeight)+parseInt(this.state.weigthNode)

    this.state.transitions[transitionIdCurrent] = {
      label : transitionCurrent.label,
      value : transitionCurrent.value,
      totalWeight: newTotalWeight
    }

    return this.setState({
      nodeLinkSelected: 0,
      transitionSelected : 0,
      weigthNode : 0
    })
  }

  clickEventTransition = (e) => {
    var newTansitionToNode = {
      node : this.state.nodeSelected,
      weigthTransition : this.state.weigthTransition,
      transition :this.state.transitionLinkSelected
    }

    this.state.transitionsToNodes.push(newTansitionToNode)

    return this.setState({
      nodeSelected: 0,
      transitionLinkSelected : 0,
      weigthTransition : 0
    })
  }

  clickEventNodeAddMark = (e) => {

    var currentNode = (this.state.nodeMarkSelected-1)

    var totalMark = parseInt(this.state.mark)+parseInt(this.state.nodes[currentNode].mark)

    var newNode = {
      label : this.state.nodes[currentNode].label,
      value : this.state.nodes[currentNode].value,
      mark : totalMark
    }

    this.state.nodes[currentNode] = newNode

    return this.setState({
      nodeMarkSelected : 0,
      mark : 0
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
        totalWeight: 0
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

  handleChangeLinkTransition = (transitionLinkSelected) => {
    this.setState({ transitionLinkSelected });
  }

  handleChangeLinkNode = (nodeLinkSelected) => {
    this.setState({ nodeLinkSelected });
  }

  render(){
    const { nodes } = this.state
    const nodesList = nodes.map((item, i) => {
        return (
              <tr key={i}>
                <td>{(i+1)}</td>
                <td>{item.mark.toString()}</td>
              </tr>
        )
    })

    const { transitions } = this.state
    const transitionList = transitions.map((item, i) => {
        return (
              <tr key={i}>
                <td>{(i+1)}</td>
                <td>{item.totalWeight.toString()}</td>
              </tr>
            )
    })

    const { nodesToTransitions } = this.state
    const nodesToTransitionsList = nodesToTransitions.map((item, i) => {
        return (
              <tr key={i}>
                <td>{item.node}</td>
                <td>{item.weigthNode}</td>
                <td>{item.transition}</td>
              </tr>
            )
    })

    const { transitionsToNodes } = this.state
    const transitionsToNodesList = transitionsToNodes.map((item, i) => {
        return (
              <tr key={i}>
                <td>{item.transition}</td>
                <td>{item.weigthTransition}</td>
                <td>{item.node}</td>
              </tr>
            )
    })

    const { transitionSelected } = this.state;
    const valueTransition = transitionSelected && transitionSelected.toString();

    const { nodeSelected } = this.state;
    const valueNode = nodeSelected && nodeSelected.toString();

    const { nodeMarkSelected } = this.state;
    const valueMarkNode = nodeMarkSelected && nodeMarkSelected.toString();

    const { transitionLinkSelected } = this.state;
    const valueTransitionMark= transitionLinkSelected && transitionLinkSelected.toString();

    const { nodeLinkSelected } = this.state;
    const valueLinkNode = nodeLinkSelected && nodeLinkSelected.toString();

    return(
        <div>
          <Container>
            <Row>
              <div className="col-sm-4">
                {/* GENERATE TRANSITIONS */}
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
                {/* LINK TRANSITIONS */}
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
                        onChange={this.handleChangeLinkTransition}
                        options={this.state.transitions}
                        simpleValue
                      />
                    </div>
                    <FormGroup
                      name="weigthTransition"
                      id="weigthTransition"
                      value={this.state.weigthTransition}
                      label="Weigth"
                      type="number"
                      colClass="col-sm-2"
                      onChange={this.updateInputWeightTransition}
                    />
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
                {/* GENERATE NODES */}
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
                {/* LINK NODES */}
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
                        name="nodeLink"
                        value={valueLinkNode}
                        onChange={this.handleChangeLinkNode}
                        options={this.state.nodes}
                        simpleValue
                      />
                    </div>
                    <FormGroup
                      name="weigth"
                      id="weigth"
                      value={this.state.weigthNode}
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
            <Row>
              <Col class="col-md-4">
                {/* GENERATE MARKS INTO NODE */}
                <Container id="nodes">
                  <Row>
                    <div className="col-sm-12 title-head-div">
                      <h5> Mark - Node </h5>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-sm-6">
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
                      colClass="col-sm-3"
                      onChange={this.updateInputMark}
                    />
                    <Button
                    id='addNode'
                    text = 'Add'
                    onClick = {this.clickEventNodeAddMark}
                    colClass = 'col-sm-2'
                    />
                  </Row>
                </Container>
              </Col>
              <Col
                class="col-sm-4"
              >
                <Table>
                  <thead>
                    <tr>
                      <td colSpan="2" className="text-center head-table-big-title">Nodes</td>
                    </tr>
                    <tr>
                      <td className="text-center head-table-little-title">Id</td>
                      <td className="text-center head-table-little-title">Mark</td>
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
                    <td colSpan="2" className="text-center head-table-big-title">Transitions</td>
                  </tr>
                  <tr>
                    <td className="text-center head-table-little-title">Id</td>
                    <td className="text-center head-table-little-title">Total Weigth to Work</td>
                  </tr>
                </thead>
                <tbody>
                    {transitionList}
                </tbody>
              </Table>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col class="col-sm-6">
                <Table>
                  <thead>
                    <tr>
                      <td colSpan="3" className="text-center head-table-big-title">NODES -> TRANSITIONS </td>
                    </tr>
                    <tr>
                      <td className="text-center head-table-little-title">Node</td>
                      <td className="text-center head-table-little-title">Weigth</td>
                      <td className="text-center head-table-little-title">Transition</td>
                    </tr>
                  </thead>
                  <tbody>
                      {nodesToTransitionsList}
                  </tbody>
                </Table>
              </Col>
              <Col class="col-sm-6">
                <Table>
                  <thead>
                    <tr>
                      <td colSpan="3" className="text-center head-table-big-title">TRANSITIONS -> NODES </td>
                    </tr>
                    <tr>
                      <td className="text-center head-table-little-title">Transition</td>
                      <td className="text-center head-table-little-title">Weigth</td>
                      <td className="text-center head-table-little-title">Node</td>
                    </tr>
                  </thead>
                  <tbody>
                      {transitionsToNodesList}
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
