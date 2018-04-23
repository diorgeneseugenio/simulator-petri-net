import React, { Component } from 'react'

import Container from './Container'
import Row from './Row'
import FormGroup from './FormGroup'
import Button from './Button'
import Table from './Table'
import Col from './Col'
import Select from 'react-select'
import lodash from 'lodash'

class PetriNet extends Component {
  constructor(props){
    super(props)
    this.state = {
      /* LISTS */
      transitions : [],
      nodes : [],
      nodesToTransitions: [],
      transitionsToNodes: [],
      transitionToRounds: [],
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
      quantTransitions : 0,
      /* SUPPORT FIELDS */
      mark : 0,
      weigthNode : 0,
      weigthTransition : 0,
      numberRounds: 0
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
    if(this.state.weigthNode > 0){
      var transitionIdCurrent = (this.state.transitionSelected-1)
      var transitionCurrent = this.state.transitions[transitionIdCurrent]

      var idNodeCurrent = (this.state.nodeLinkSelected-1)

      var newNodeToTransition = {
        node : this.state.nodeLinkSelected,
        weigthNode : this.state.weigthNode,
        transition : this.state.transitionSelected
      }

      var exists = false
      var idNodeToTransition = 0
      var subsWeight = 0

      var { nodesToTransitions } = this.state
      nodesToTransitions.map((item, i) => {
        if(item.transition === this.state.transitionSelected && item.node === this.state.nodeLinkSelected){
          exists = true
          idNodeToTransition = i
          subsWeight = -1*item.weigthNode
        }
      })

      if(!exists){
        this.state.nodesToTransitions.push(newNodeToTransition)
      }else{
        this.state.nodesToTransitions[idNodeToTransition] = newNodeToTransition
      }

      var newTotalWeight = parseInt(transitionCurrent.totalWeight)+parseInt(this.state.weigthNode)+parseInt(subsWeight)

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
  }

  clickEventTransition = (e) => {

    if(this.state.weigthTransition > 0){
      var newTansitionToNode = {
        node : this.state.nodeSelected,
        weigthTransition : this.state.weigthTransition,
        transition :this.state.transitionLinkSelected
      }

      var exists = false;
      var idTransitionToNode = 0;

      var { transitionsToNodes } = this.state
      transitionsToNodes.map((item, i) => {
        if(item.transition === this.state.transitionLinkSelected && item.node === this.state.nodeSelected){
          exists = true
          idTransitionToNode = i
        }
      })

      if(!exists){
        this.state.transitionsToNodes.push(newTansitionToNode)
      }else{
        this.state.transitionsToNodes[idTransitionToNode] = newTansitionToNode
      }
    }

    return this.setState({
      nodeSelected: 0,
      transitionLinkSelected : 0,
      weigthTransition : 0
    })
  }

  clickEventNodeAddMark = (e) => {

    if(this.state.mark > 0){
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
  }

  clickEventHowManyTransitions = (e) => {
    var numManyOld = 1*this.state.howManyTransitionsOld;
    var numMany = 1*this.state.howManyTransitions;
    var numTotal = numManyOld+numMany;
    var numQuant = 1*this.state.quantTransitions;

    for (var i = numManyOld; i < numTotal; i++) {
      numQuant += 1
      this.state.transitions.push({
        label : i + 1,
        value : i + 1,
        totalWeight: 0
      })
    }

    return this.setState({
      howManyTransitionsOld : this.state.howManyTransitions,
      howManyTransitions : 0,
      quantTransitions : numQuant
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

  clickRunNet= (e) => {
    var newNumberRounds = (parseInt(this.state.numberRounds) + 1)
    var listTransitions = []
    var node = 0
    var totalWeightState = 0
    var totalWeightInteration = 0
    var activeTransition = true
    var transitionCurrent = null
    var keyNode = 0
    this.state.transitions.map((item, i) => {
      totalWeightState = parseInt(item.totalWeight)
      totalWeightInteration = 0
      activeTransition = true
      transitionCurrent = null
      var numNodes = 0
      var auxTran = []
      var totalTimes = 0
      this.state.nodesToTransitions.map((ntt, n) => {
        var times = 0
        if(ntt.transition == item.label && activeTransition == true){
          numNodes++
          var keyNode = parseInt(ntt.node)-1
          var nodeN = this.state.nodes[keyNode]
          if(nodeN.mark < ntt.weigthNode){
            activeTransition = false
          }else{
            var isPossible = true
            var sumMark = 0
            while(isPossible){
              if(nodeN.mark < ntt.weigthNode){
                 isPossible = false
              }else{
                times++
                totalTimes++
                nodeN.mark -= parseInt(ntt.weigthNode)
                sumMark += parseInt(ntt.weigthNode)
                totalWeightInteration += ntt.weigthNode
              }
            }

            nodeN.mark = sumMark

            var aux = {
              node : keyNode,
              weight : ntt.weigthNode,
              times : times
            }
            auxTran.push(aux)
          }
        }
      })

      if(totalWeightState > totalWeightInteration || totalWeightState == 0){
        activeTransition = false
      }

      if(activeTransition){
        auxTran.map((item, i) => {
          var lessTime = item.times
          auxTran.map((dado, d) => {
            if(item.weight == dado.weight && dado.times < item.times){
              lessTime = dado.times
            }
          })
          var nodeCurrent = this.state.nodes[item.node]
          nodeCurrent.mark -= parseInt(item.weight)*lessTime
          this.state.nodes[item.node] = nodeCurrent
        })
      }

      var isValid = false
      var coef = (parseInt(totalTimes)/parseInt(numNodes))
      while(!isValid){
        var coef = (parseInt(totalTimes)/parseInt(numNodes))
        //console.log("NODE = "+item.label+" totalTimes = "+totalTimes+" / numNodes = "+numNodes)
        if((coef / totalWeightState) % 1 == 0){
          isValid = true
        }else{
          totalTimes--
        }
      }

      transitionCurrent = {
        id : item.label,
        active: activeTransition,
        numTimes: coef
      }

      listTransitions.push(transitionCurrent)
    })

    listTransitions.map((item, i) => {
      if(item.active){
        this.state.transitionsToNodes.map((ttn, t) => {
          if(ttn.transition == item.id){
            var totalMark = 0
            var keyNode = parseInt(ttn.node)-1
            var node = this.state.nodes[keyNode]
            if(!item.numTimes) item.numTimes = 1
            totalMark = parseInt(node.mark)+(parseInt(ttn.weigthTransition)*parseInt(item.numTimes))
            node.mark = totalMark
            this.state.nodes[keyNode] = node
          }
        })
      }
    })

    var newRound = {
      round : newNumberRounds,
      transitions : listTransitions
    }

    this.state.transitionToRounds.push(newRound)

    return this.setState({
      numberRounds : newNumberRounds
    })
  }

  clickResetNet = (e) => {
    return this.setState({
      transitionToRounds : []
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

    const transitionsActivesHeader = transitions.map((item, i) => {
        return (
                <td>T{item.label}</td>
            )
    })
    const { transitionToRounds } = this.state
    const transitionsToRoundList = transitionToRounds.map((item, i) => {
      //console.log(item)
        return (
              <tr key={i}>
                <td>{item.round}</td>
                {item.transitions.map((dados, d) => {
                  return(
                    <td>{dados.active ? 'Yes' : 'No'}</td>
                  )
                })}
              </tr>
            )
    })

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
          <Container>
            <Row>
              <Col class="col-sm-1">
                <Button
                id='runNet'
                text = 'Run'
                onClick = {this.clickRunNet}
                colClass = 'col-sm-1'
                />
              </Col>
              <Col class="col-sm-1">
                <Button
                id='resetNet'
                text = 'Reset'
                onClick = {this.clickResetNet}
                colClass = 'col-sm-1'
                />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col class="col-sm-12">
                <Table>
                  <thead>
                    <tr>
                      <td colSpan={(this.state.quantTransitions+1)} className="text-center head-table-big-title">ROUND TRANSITIONS</td>
                    </tr>
                    <tr>
                      <td></td>
                      {transitionsActivesHeader}
                    </tr>
                  </thead>
                  <tbody>
                    {transitionsToRoundList}
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
