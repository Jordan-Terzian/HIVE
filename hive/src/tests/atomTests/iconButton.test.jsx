import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import IconButton from '../../components/atoms/iconButton';

describe('IconButton', () => {
  it('renders the provided text', () => {
    const { getByText } = render(<IconButton text="Click Me" iconPath="dummy-path" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('fires the onPress callback when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<IconButton text="Click Me" iconPath="dummy-path" onPress={onPressMock} />);
    fireEvent.click(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('has the correct styles', () => {
    const { getByText } = render(<IconButton text="Click Me" iconPath="dummy-path" />);
    const button = getByText('Click Me').closest('button');
    expect(button).toHaveStyle({
      position: 'absolute',
      top: '10px',
      right: '10px',
      textTransform: 'none',
    });
  });


});

