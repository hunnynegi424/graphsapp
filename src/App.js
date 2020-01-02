import React from 'react';
import { connect } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import isEmpty from 'lodash/isEmpty';
import colorArray from './components/Colors';
import './App.css';
import {addItem} from './actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      chartData: {},
    }
  }

  onKeyUp(target, e) {
    if(e.keyCode === 13) {
      switch (target) {
        case 'item':
          this.inputQty.focus();
          break;
        case 'qty':
          this.submit.focus();
          break;
        case 'submit':
          this.inputItem.focus();
          break;
        default:
        break;
      }
    }
  }

  async onClick() {
    const pattern = new RegExp(/^[0-9]*$/);
    const value = pattern.test(this.inputQty.value);
    if (value) {
      if(!isEmpty(this.inputItem.value) && !isEmpty(this.inputQty.value)){
        const Item = this.inputItem.value.charAt(0).toUpperCase() + this.inputItem.value.slice(1);
        await this.props.dispatch(addItem({item: Item, qty: this.inputQty.value}));
        this.inputItem.value = '';
        this.inputQty.value = '';
      } else {
        alert("Fields cannot be empty.");  
      }
    } else {
      this.inputQty.value = '';
      alert("Quantity should be a number.");
      this.inputQty.focus();
    }
    this.getData();
  }

  getData() {
    let response = {};
    this.props.NewItem.forEach(({item, qty}) => {
      response[item] = qty;
    });
    const keys = Object.keys(response);
    const values = Object.values(response);
    this.setState({
        chartData: {
          labels: keys,
          datasets: [
            {
              label: "Items as per Quantity",
              data: values,
              backgroundColor: colorArray,
            }
          ],
          options: {
            
          }
        }
      }, ()=> console.log('state', this.state))
  }

  render() {
    let counter = 1;
    return (
      <div className="App">
        <span className="table1">
          <div style={{ fontSize: 50, color: 'white', margin: 10 }}>Inventory</div>
          <input
            type="text"
            ref={e => this.inputItem = e}
            onKeyUp={this.onKeyUp.bind(this, "item")}
            placeholder="Enter an item"
            className="inputCell"
            />
          <input
            type="text"
            ref={e => this.inputQty = e}
            onKeyUp={this.onKeyUp.bind(this, "qty")}
            placeholder="Enter Quantity"
            className="inputCell"
            />
          <button
            ref={e => this.submit = e}
            className="addBtn"
            onClick={()=> this.onClick()}
            onKeyUp={this.onKeyUp.bind(this, "submit")}
          >+</button>
          {this.props.NewItem.map(e => (
            <div className="list">
              <span style={{ color: "white"}}>
                {counter++}.
              </span>
              <span className="cell">
                {e.item}
              </span>
              <span className="cell">
                {e.qty}
              </span>
              <span tooltip="Delete" style={{ fontWeight: 'bolder', cursor: 'pointer', color: 'white'}}>
                x
              </span>
            </div>
          ))}
        </span>
        <span className="table2">
          <div className="row">
            <div className="chart">
              {this.props.NewItem && <Doughnut
                data={this.state.chartData}
                width= {400}
                height= {300}
                options={{
                  legend: {
                    display: true,
                    position: 'bottom',
                  }
                }}
              />}
            </div>
          </div>
          <div className="row">
          <div className="chart">
            {this.props.NewItem !== [] && <Line
              data={this.state.chartData}
              width= {400}
              height= {300}
              options={{
                legend: {
                  display: true,
                  position: 'bottom',
                }
              }}
            />}
          </div>
          </div>
        </span>
      </div>
    );
  }
}

const mapSTateToProps = state => state;

export default connect(mapSTateToProps)(App);
