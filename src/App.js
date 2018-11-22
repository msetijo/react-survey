import React, { Component } from 'react';

import './App.css';

class Question extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <input type="text" placeholder="Question" value={this.props.value} onChange={this.props.onChange} onSubmit={this.props.seeSurvey}/>
      </div>
    );
    
  }
}

class Questions extends Component {
  constructor(props){
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.seeSurvey = this.seeSurvey.bind(this);
    this.counter = 0;
    this.state = {
      value: [],
      questionComponents : []
    }
  }
  seeSurvey(){
    console.log('A name was submitted: ' + this.state.value);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  addQuestion(){
    const questionComponent = () => {
      return <div>
                <Question value={this.state.value[counter]} onChange={this.handleChange} onSubmit={this.seeSurvey} />
             </div>
      }
    const newArray = this.state.questionComponents.concat(questionComponent);
    this.setState({ questionComponents: newArray });
  }
  render(){
    if(this.state.questionComponents === []){
      const questionComponent = () => {
        return <div>
                  <Question value={this.state.value} onChange={this.handleChange} onSubmit={this.seeSurvey} />
               </div>
        }
      const newArray = this.state.questionComponents.concat(questionComponent);
      this.setState({ questionComponents: newArray });
    }
    const questions = this.state.questionComponents.map((Element, index) => {
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
        </div>
      );
  }
}
class MultipleAnswer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <input type="radio" /><input type="text" placeholder="Multiple Choice Answer" />
      </div>
    );
    
  }
}
class ShortAnswer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <input type="text" placeholder="Short Answer" />
      </div>
    );
    
  }
}

class Answers extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'multiple', 
      answers: [MultipleAnswer],
      showAnswerButton: true
    };
    this.optionChange = this.optionChange.bind(this);
    this.answerFormat = this.answerFormat.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }
  
  optionChange(event){
    const selected = event.target.value;
    this.setState({value: selected});
    this.answerFormat(selected);
  }
  
  answerFormat(selected){
    if(selected === 'multiple'){
      const newAnswers = [].concat(MultipleAnswer);
      this.setState({showAnswerButton: true });
      this.setState({ answers: newAnswers });
    }else{
      const newAnswers = [].concat(ShortAnswer);
      this.setState({showAnswerButton: false });
      this.setState({ answers: newAnswers });
    }
  }
  addAnswer(){
    const selected = this.state.value;
    if(selected === 'multiple'){
      const newAnswers = this.state.answers.slice();
      newAnswers.push(MultipleAnswer);
      this.setState({ answers: newAnswers });
    }else{
      const newAnswers = this.state.answers.slice();
      newAnswers.push(ShortAnswer);
      this.setState({ answers: newAnswers });
    }
  }
  render(){
    const answers = this.state.answers.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });
    return(
      <div>
      <select value={this.state.value} onChange={this.optionChange}>
          <option value="multiple">Multiple Choice</option>
          <option value="short">Short Answer</option>
      </select>
      <div className="inputs">
      { answers }
      </div>
      { this.state.showAnswerButton ? <a class="addAnswer" onClick={this.addAnswer} href="#">Add Answer</a> : null }
     </div>
    );
  }
}

class CreateSurvey extends Component {

  render() {
    return (
      <div className="App">
        <Questions />
        
      </div>
    );
  }
}

export default CreateSurvey;
