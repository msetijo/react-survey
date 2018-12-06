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
        return <p>Question no {i}: {this.state.value['question' + i]}</p>
      }
      newArray.push(printQuestionComponent);
      
      let check = true;
      const counter = 0;
      while(check){
        const letter = String.fromCharCode(65 + counter);
        if(this.state.value['answer' + i + letter]){
          var printAnswerComponent = () => {
            //<input type="text" placeholder="Your answer" />

            return <p>Answer choice: {this.state.value['answer' + i + letter]}</p>
          }
          counter++;
          newArray.push(printAnswerComponent);
          
        }else{
          check = false;
        }
      }
      /*if(this.state.value['question'+i] != null){
        newArray.push(printQuestionComponent);
        newArray.push(printAnswerComponent);
      }*/
    }
    
    this.setState({ printSurvey: newArray });
  }

  handleChange(event) {
    const valueArray = this.state.value;
    valueArray[event.target.name] = event.target.value;
    this.setState({ value: valueArray });
    console.log(valueArray);
  }

  getAnswers(answer, ansNum) {
    const num = ansNum.match(/[0-9]+[A-Z]/g);
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
        <input type="text" className="answerInput" placeholder="Short answer text" name={this.props.name} disabled />
        <div className="underlineAnswer"></div>
      </div>
    );

  }
}
class MultipleChoiceAnswer extends Component {
  render() {
    return (
      <div className="multipleAnswer">
        <div className="multipleChoiceCircle"></div><input type="text" className="multipleAnswerInput" placeholder="Option" name={this.props.name} onChange={this.props.onChange} />
      </div>
    );

  }
}

class Answers extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.counter = 0;
    this.state = {
      multipleAnswerComponents : []
    }
  }

  handleChange(event) {

    this.props.answers(event.target.value, event.target.name);
    console.log(event.target.name);

  }

  addAnswer() {
    this.counter = this.counter + 1;
    const currentLetter = String.fromCharCode(65 + this.counter);
    const answerComponent = () => {
      return <MultipleChoiceAnswer name={'answer' + this.props.counter + currentLetter} onChange={this.handleChange} />
    }
    const newArray = this.state.multipleAnswerComponents.concat(answerComponent);
    this.setState({ multipleAnswerComponents: newArray });
  }
  
  render() {
//<ShortAnswer name={'answer' + this.props.counter} />
    if (this.state.multipleAnswerComponents.length === 0) {

      const currentLetter = String.fromCharCode(65 + this.counter);

      const answerComponent = () => {
        return <MultipleChoiceAnswer name={'answer' + this.props.counter + currentLetter} onChange={this.handleChange} />
      }
      
      this.state.multipleAnswerComponents.push(answerComponent);

    }

    const answers = this.state.multipleAnswerComponents.map((Element, index) => {
      return <Element key={index} index={index} />
    });

    return (
      <div>
        <div className="inputs">
            {answers}
        </div>
        <a id="addAnswer" onClick={this.addAnswer} href="#"><span>+</span> Answer</a>
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
