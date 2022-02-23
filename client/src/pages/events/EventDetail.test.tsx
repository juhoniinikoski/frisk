import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventDetail from './EventDetail';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      eventId: 'juhoniinikoski.Pihapelit'
    }
  },
  ...props
});

describe('Event detail page tests', () => {

  let props: any;   // use type "any" to opt-out of type-checking
  beforeEach(() => {
    props = createTestProps({});
  });

  test('should render a page', () => {
    render(<EventDetail {...props}/>)
  })

})