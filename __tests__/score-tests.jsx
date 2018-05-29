import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TenPinBowlingScoreCalculator from '../jsx/TenPinBowlingScoreCalculator';

Enzyme.configure({ adapter: new Adapter() });

test('All Spares Test', () => {
  const component = shallow(<TenPinBowlingScoreCalculator />);
  component.setState({ input: '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5' });
  component.find('.scorebutton').simulate('click');
  const { score } = component.state();
  expect(score).toEqual(150);
});

test('All Strikes Test', () => {
  const component = shallow(<TenPinBowlingScoreCalculator />);
  component.setState({ input: 'X X X X X X X X X X X X' });
  component.find('.scorebutton').simulate('click');
  const { score } = component.state();
  expect(score).toEqual(300);
});

test('Mixed Scores Test', () => {
  const component = shallow(<TenPinBowlingScoreCalculator />);
  component.setState({ input: '23 5/ 81 X X 35 23 7/ 14 X 3 4' });
  component.find('.scorebutton').simulate('click');
  const { score } = component.state();
  expect(score).toEqual(119);
});

test('Scores With Missed Shots Test', () => {
  const component = shallow(<TenPinBowlingScoreCalculator />);
  component.setState({ input: '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-' });
  component.find('.scorebutton').simulate('click');
  const { score } = component.state();
  expect(score).toEqual(90);
});
