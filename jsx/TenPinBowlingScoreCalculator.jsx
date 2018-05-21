import React from 'react';
import '../css/app.css';

export default class TenPinBowlingScoreCalculator extends React.Component {
  constructor(props) {
      super(props);
      this.score = this.score.bind(this);
  }

  componentDidMount() {

  }

  score(){
      alert('Score is');
  }

  render() {
      return (
          <div className="container">
            Sequence Of Rolls:
            <input type="text" className="rollsinput" name="sequenceofrolls" />
            <input type="button" onClick={this.score} className="scorebutton" name="scorebutton" value="Score" />            
          </div>
        );
    }

}
