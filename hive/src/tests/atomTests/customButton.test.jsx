import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from '../../components/atoms/customButton';

describe('CustomButton', () => {
  it('renders the label', () => {
    const { getByText } = render(<CustomButton label="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('fires the onPress callback when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton label="Click Me" onPress={onPressMock} />);
    fireEvent.click(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('has the correct styles', () => {
    const { getByText } = render(<CustomButton label="Click Me" />);
    const button = getByText('Click Me').closest('button');
    expect(button).toHaveStyle({
      background: 'linear-gradient(45deg, #FFC52A 30%, #F69515 90%)',
      borderRadius: '30px',
      color: 'white',
      height: '48px',
      padding: '0 30px',
      textTransform: 'none',
    });
  });
});

