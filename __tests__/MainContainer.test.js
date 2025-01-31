const fs = require("fs");
const path = require("path");
import React from 'react';
import { IsoTwoTone } from "@material-ui/icons";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

// const MainContainer = require("../client/containers/MainContainer");
import MainContainer from "../client/containers/MainContainer";
import { ExpansionPanelActions } from '@material-ui/core';

configure({ adapter: new Adapter() });


describe('algorithm test', () => {
  
  describe('MainContainer shallow tests', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<MainContainer />);
    });

    it('should have a state where board is a 15 x 30 grid; 450 nodes total', () => {
      expect(Object.keys(wrapper.state().board)).toHaveLength(450);
    });

    it('should have a div with the className gridContainer', () => {
      // expect(wrapper.find('div')).toHaveLength(4);
      expect(wrapper.find('div.gridContainer')).toHaveLength(1);
    });
    
    it('should have gridContainer contain 450 button elements', () => {
      expect(wrapper.find('.gridContainer').first().find('button')).toHaveLength(450);
    });
  });

  describe('MainContainer mount tests', () => {
    let wrapper;
    
    beforeAll(() => {
      wrapper = mount(<MainContainer />);
      jest.useFakeTimers();
    });

    afterAll(() => {

    })

    it('should have exactly one head button with an id of "0,0" inside gridContainer', () => {
      let head = wrapper
        .find('.gridContainer')
        .find('.head');

      expect(head).toHaveLength(1);

      head = head.first();

      expect(head.props()).toHaveProperty('id', '0,0');
    });

    it('should have exactly one target button with an id of "9,9" inside gridContainer', () => {
      let target = wrapper
        .find('.gridContainer')
        .find('.target');

      expect(target).toHaveLength(1);

      target = target.first();

      expect(target.props()).toHaveProperty('id', '9,9');
    });

    it('should have a path of length 17 upon invoking algorithm() from default state', () => {
      const instance = wrapper.instance();
      expect(instance.state.path).toHaveLength(0);

      instance.algorithm();
      jest.runAllTimers();

      expect(instance.state.path).toHaveLength(17);
    });
  })
});

// MainContainer => testing grid
// component did mount
// ensure all grids = 30 x 15, ensure that we only have 30 x 15 (component did mount)

// algorithm - WITHOUT WALL!!
// given point A, point B takes the certain paths(e.g. [{0, 0}, {0, 1}, {0, 2} ... ])

// path length/distance test: given two nodes, target and head

// mouse event handlers
//   button changes property upon click

// navigation bar => functionality tests

// mode change
//   mode changes upon navbar click

// Navbar => state?

// ensure event handlers are passed down

// render test - DOM

// enzyme
