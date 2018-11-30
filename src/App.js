import React, { Component } from 'react';

import './App.css';

class Question extends Component {

  render() {
    return (
      <div>
        <input type="text" className="questionInput" placeholder="Question" name={this.props.name} onChange={this.props.onChange} />
        <div className="underline"></div>
      </div>
    );
  }
}

class Survey extends Component {

  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.seeSurvey = this.seeSurvey.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.counter = 1;
    this.answerNumber = '';
    this.state = {
      value: [],
      questionComponents: [],
      answers: '',
      printSurvey: []
    }
  }

  seeSurvey(event) {
    
    event.preventDefault();
    let newArray = [];
    
    for (let i = 1; i <= this.counter; i++) {

      const printQuestionComponent = () => {
        return <div><p>Question no {i}: {this.state.value['question' + i]}</p></div>
      }
    
      const printAnswerComponent = () => {
        return <div><p>Answer: {this.state.value['answer' + i]}</p></div>
      }
      if(this.state.value['question'+i] != null){
        newArray.push(printQuestionComponent);
        newArray.push(printAnswerComponent);
      }
    }
    
    this.setState({ printSurvey: newArray });
  }

  handleChange(event) {
    const valueArray = this.state.value;
    valueArray[event.target.name] = event.target.value;
    this.setState({ value: valueArray });
    console.log(valueArray);
    console.log(event.target.value);
  }

  getAnswers(answer, ansNum) {
    const num = ansNum.match(/[0-9]+/g);
    const valueArray = this.state.value;
    valueArray['answer' + num] = answer;
    this.setState({ value: valueArray });
    console.log(valueArray);
  }

  addQuestion() {
    const currentCounter = this.counter + 1;
    this.counter = this.counter + 1;
    const questionComponent = () => {
      return <div>
        <Question name={'question' + currentCounter} onChange={this.handleChange} />
        <Answers answers={this.getAnswers} counter={currentCounter} />
      </div>
    }
    const newArray = this.state.questionComponents.concat(questionComponent);
    this.setState({ questionComponents: newArray });
  }

  render() {

    if (this.state.questionComponents.length === 0) {

      const currentCounter = this.counter;

      const questionComponent = () => {
        return <div>
          <Question name={'question' + currentCounter} onChange={this.handleChange} />
          <Answers answers={this.getAnswers} counter={currentCounter} />
        </div>
      }
      
      this.state.questionComponents.push(questionComponent);

    }

    const questions = this.state.questionComponents.map((Element, index) => {
      return <Element key={index} index={index} />
    });
    
    const printSurvey = this.state.printSurvey.map((Element, index) => {
      return <Element key={index} index={index} />
    });
    
    return (
      <div>
        <form onSubmit={this.seeSurvey}>
          <div className="inputs">
            {questions}
          </div>
          <a id="addQuestion" onClick={this.addQuestion} href="#"><span>+</span> Question</a>
          <p><input id="saveSurvey" type="submit" value="Survey Preview" /></p>
        </form>
        <div className="printedSurvey">
          {printSurvey}
        </div>
      </div>
    );
  }
}

class ShortAnswer extends Component {
  render() {
    return (
      <div>
        <input type="text" className="answerInput" placeholder="Short Answer" name={this.props.name} onChange={this.props.onChange} />
        <div className="underline"></div>
      </div>
    );

  }
}

class Answers extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    this.props.answers(event.target.value, event.target.name);
    console.log(event.target.name);

  }
  
  render() {

    return (
      <div>
        <div className="inputs">
          <ShortAnswer name={'answer' + this.props.counter} onChange={this.handleChange}  />
        </div>
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
