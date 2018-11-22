import React, { Component } from 'react';

import './App.css';

class Question extends Component {
  render(){
    return(
        <div>
        <input type="text" placeholder="Question" name={this.props.name} onChange={this.props.onChange} />
        </div>
    );
  }
}

class Survey extends Component {
  constructor(props){
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.seeSurvey = this.seeSurvey.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.counter = 1;
    this.state = {
      value: [],
      questionsPrinted: [],
      questionComponents : [],
      answersPrinted: []
    }
  }
  seeSurvey(event){
   event.preventDefault();
   let newArray = [];
   for(let i =1; i<=this.counter; i++){
      const printQuestionComponent = () => {
        return <div><p>Question: {this.state.value['question'+i]}</p></div>
      }
      newArray.push(printQuestionComponent);
   }
    this.setState({ questionsPrinted: newArray });
  }
  handleChange (event) {
    const valueArray = this.state.value;
    valueArray[event.target.name]=event.target.value;
    this.setState({ value: valueArray });
    console.log(event.target.value);
  }
  getAnswers(val){
    let newArray = [];
    for(let i =1; i<=this.counter; i++){
       const printAnswerComponent = () => {
         return <div><p>Answer(s): {val['answer'+i]}</p></div>
       }
       newArray.push(printAnswerComponent);
    }
     this.setState({ answersPrinted: newArray });
  }
  addQuestion(){
    const currentCounter = this.counter+1;
    this.counter = this.counter+1;
    const questionComponent = () => {
      return <div>
                <Question name={'question'+currentCounter} onChange={this.handleChange} />
                <Answers answers={this.getAnswers} />
             </div>
    }
    const newArray = this.state.questionComponents.concat(questionComponent);
    this.setState({ questionComponents: newArray });
  }
  render(){
    if(this.state.questionComponents.length === 0){
      const currentCounter = this.counter;
      const questionComponent = () => {
        return <div>
                  <Question name={'question'+currentCounter} onChange={this.handleChange} />
                  <Answers answers={this.getAnswers} />
               </div>
      }
      this.state.questionComponents.push(questionComponent);
    }
    const questions = this.state.questionComponents.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });
    const questionsPrinted = this.state.questionsPrinted.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });
    const answersPrinted = this.state.answersPrinted.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });
      return(
        <div>
          <form onSubmit={this.seeSurvey}>
          <div className="inputs">
            {questions}
          </div>
          <p><a id="addQuestion" onClick={this.addQuestion} href="#">Add Question</a></p>
          <input id="saveSurvey" type="submit" value="Survey Preview" />
         </form>
         <div className="printedSurvey">
            {questionsPrinted}
            {answersPrinted}
          </div>
        </div>
      );
  }
}
class MultipleAnswer extends Component{
  render(){
    return(
      <div>
        <input type="radio" /><input type="text" placeholder="Multiple Choice Answer" name={this.props.name} onChange={this.props.onChange} />
      </div>
    );
    
  }
}
class ShortAnswer extends Component{
  render(){
    return(
      <div>
        <input type="text" placeholder="Short Answer" name={this.props.name} onChange={this.props.onChange} />
      </div>
    );
    
  }
}

class Answers extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected:'multiple', 
      answerArray: [],
      answerArrayComponents: [],
      showAnswerButton: true
    };
    this.counter = 1;
    this.optionChange = this.optionChange.bind(this);
    //this.answerFormat = this.answerFormat.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  optionChange(event){
    const selected = event.target.value;
    this.setState({selected: selected});
    //this.answerFormat(selected);
  }
  /*answerFormat(selected){
    if(selected === 'multiple'){
      const newAnswers = [].concat(MultipleAnswer);
      this.setState({showAnswerButton: true });
      this.setState({ answers: newAnswers });
    }else{
      const newAnswers = [].concat(ShortAnswer);
      this.setState({showAnswerButton: false });
      this.setState({ answers: newAnswers });
    }
  }*/
  addAnswer(){
    const currentCounter = this.counter+1;
    this.counter = this.counter+1;
    const selected = this.state.selected;

    if(selected === 'multiple'){
      const multipleAnswerComponent = () => {
        return <div>
                  <MultipleAnswer name={'answer'+currentCounter} onChange={this.handleChange} />
               </div>
      }
      const newArray = this.state.answerArrayComponents.concat(multipleAnswerComponent);
      this.setState({ answerArrayComponents: newArray });
    }else{
      const shortAnswerComponent = () => {
        return <div>
                  <ShortAnswer name={'answer'+currentCounter} onChange={this.handleChange} />
               </div>
      }
      const newArray = this.state.answerArrayComponents.concat(shortAnswerComponent);
      this.setState({ answerArrayComponents: newArray });
    }
  }
  handleChange (event) {
    const answerArray = this.state.answerArray;
    answerArray[event.target.name]=event.target.value;
    this.setState({ answerArray: answerArray });
    this.props.answers(answerArray);
    console.log(event.target.value);
  }
  render(){
    if(this.state.answerArrayComponents.length === 0){
      const currentCounter = this.counter;
      const multipleAnswerComponent = () => {
        return <div>
                  <MultipleAnswer name={'answer'+currentCounter} onChange={this.handleChange} />
               </div>
      }
      this.state.answerArrayComponents.push(multipleAnswerComponent);
    }
    const answerArrayComponents = this.state.answerArrayComponents.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });
    return(
      <div>
      <select value={this.state.value} onChange={this.optionChange}>
          <option value="multiple">Multiple Choice</option>
          <option value="short">Short Answer</option>
      </select>
      <div className="inputs">
      { answerArrayComponents }
      </div>
      { this.state.showAnswerButton ? <a className="addAnswer" onClick={this.addAnswer} href="#">Add Answer</a> : null }
     </div>
    );
  }
}

class CreateSurvey extends Component {

  render() {
    return (
      <div className="App">
        <Survey />
        
      </div>
    );
  }
}

export default CreateSurvey;
