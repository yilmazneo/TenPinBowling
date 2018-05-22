import React from 'react';
import '../css/app.css';

export default class TenPinBowlingScoreCalculator extends React.Component {
  constructor(props) {
      super(props)
      this.scoreGame = this.scoreGame.bind(this)
      this.state = {score:0,isValid:true}
  }

  scoreGame(){
      const input = document.getElementById('sequenceofrolls')
      const scoreLabel = document.getElementById('scorelabel')
      let points = input.value.split(' ')
      frames = []
      points.forEach( e => {let frame = e.split('');frames.push(frame)})
      
      // Parse the input and replace all chars with number
      let parsedFrames = frames.map( frame => {
          return frame.map( (point,i) => {
            if(point === 'X') return 10
            else if(point === '/') return 10 - parseInt(frame[i-1])
            else if(point === '-') return 0
            else return parseInt(point)
          })          
      })
      const isValid = this.validateGame(parsedFrames)
      this.setState({score:this.calculate(parsedFrames),isValid:isValid})
  }

  validateGame(frames){
    let isValid = true
    const numberOfFrames = frames.length
    let frameTotals = frames.map((v,i) => v.reduce( (acc,cur,i) => acc + (i <= 2 ? cur : 0) <= 10))
    let allTotalsInLimit = frameTotals.reduce((acc,cur) => acc && cur)
    
    // If there is a frame with total more than 10 without bonus
    if(!allTotalsInLimit) isValid = false
    // If number of frames is 12 which means 2 bonuses, but the last frame is not strike
    else if(numberOfFrames == 12 && frames[9][0] !== 10 ) isValid = false 
    // If the frame count is 10 and last frame has strike, but bonus points are not there  
    else if(numberOfFrames == 10 && frames[9][0] === 10) isValid = false    
    // If the frame count is 10 and last frame has spare, but bonus point is not there  
    else if(numberOfFrames == 10 && frames[9][0] !== 10 && frames[9][0] + frames[9][1] == 10 && frames[9].length != 3 ) isValid = false
    else if(numberOfFrames < 10) isValid = false
    else if(numberOfFrames == 11) isValid = false
    else if(numberOfFrames.length > 12) isValid = false

    return isValid
  }

  calculate(frames){    
    let frameTotalsWithBonuses = frames.map( (v,i) => {
        // If bonus frames for the last strike, then don't count them in separately, just add to last frame
        if(i>9) return 0
        // if length is 1, it means it is a strike, so add next 2 rolls as bonus
        else if(v.length == 1) return parseInt(v) + parseInt(this.getNextTwoRollTotal(frames,i))
        // If last frame and has more than one roll in it, it is either without bonus or a spare, in both cases just sum it all in the frame
        else if(i == 9) return v.reduce( (acc,cur) => acc + cur)        
        // If the total of the frame is 10, then it is a spare, 10 plus the next roll as bonus
        else if(v.reduce( (acc,cur) => acc + cur) == 10) return 10 + frames[i+1][0]
        // If none of the above caught it, it means it is just a frame that needs to be summed up because total is less than 10
        else return v.reduce( (acc,cur) => acc + cur)
    })
    return frameTotalsWithBonuses.reduce((acc,cur) => acc + cur)
  }

  getNextTwoRollTotal(frames,i){
    if(frames[i+1].length == 2) return frames[i+1].reduce((acc,cur) => acc + cur)
    else return frames[i+1][0] + frames[i+2][0]
  }

  render() {
      return (
          <div className="container">
            Sequence Of Rolls:
            <input type="text" className="rollsinput" id="sequenceofrolls" />
            <input type="button" onClick={this.scoreGame} className="scorebutton" id="scorebutton" value="Score" />            
            <div>
                <h1 id="scorelabel" className={this.state.isValid ? 'visible' : 'hidden'}>{this.state.score != 0 ? 'Game Score is ' + this.state.score : ''}</h1>
                <h1 id="errorlabel" className={this.state.isValid ? 'hidden' : 'visible'}>Invalid Game</h1>
            </div>
          </div>
        );
    }

}
