import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { add, changeDescription, clear, search } from './todoActions'

import Grid from "../template/grid";
import IconButton from "../template/iconButton";

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  //componente de ciclo de vida, quando é montado o componente
  componentWillMount() {
    this.props.search()
  }

  keyHandler(e) {
    const { add, search, clear, description } = this.props
    if (e.key === "Enter")
      e.shiftKey ? search() : add(description);
    else if (e.key === "Escape") clear();
  }
  render() {
    const { add, search, clear, description } = this.props
    return (
      <div role="form" className="todoForm">
        <Grid cols="12 9 10">
          <input
            type="text"
            id="description"
            className="form-control"
            placeholder="Adicione uma tarefa"
            onChange={this.props.changeDescription}
            onKeyUp={this.keyHandler}
            value={description}
          />
        </Grid>
        <Grid cols="12 3 2">
          {/* arrow function pq não ta passando o evento e precisamos mandar parametros */}
          <IconButton style="primary" icon="plus" onClick={() => add(description)} />
          <IconButton style="info" icon="search" onClick={search} />
          <IconButton style="default" icon="close" onClick={clear} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, clear, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)










// componente funcional, para o restante (usar o did mount) foi preciso fazer ele em class 
// import React from "react";
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import { changeDescription, search } from './todoActions'

// import Grid from "../template/grid";
// import IconButton from "../template/iconButton";

// const TodoForm = props => {
//   const keyHandler = (e) => {
//     if (e.key === "Enter")
//       e.shiftKey ? props.handleSearch() : props.handleAdd();
//     else if (e.key === "Escape") props.handleClear();
//   };
//   return (
//     <div role="form" className="todoForm">
//       <Grid cols="12 9 10">
//         <input
//           type="text"
//           id="description"
//           className="form-control"
//           placeholder="Adicione uma tarefa"
//           onChange={props.changeDescription}
//           onKeyUp={keyHandler}
//           value={props.description}
//         />
//       </Grid>
//       <Grid cols="12 3 2">
//         <IconButton style="primary" icon="plus" onClick={props.handleAdd} />
//         <IconButton style="info" icon="search" onClick={props.handleSearch} />
//         <IconButton style="default" icon="close" onClick={props.handleClear} />
//       </Grid>
//     </div>
//   );
// };

// const mapStateToProps = state => ({ description: state.todo.description })
// const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
