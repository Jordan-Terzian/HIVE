import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBubble from '../../components/atoms/chatBubble';

describe('ChatBubble Component Tests', () => {

    it('should render the component correctly', () => {
        render(<ChatBubble sender="John" text="Hello" isSent={true} timestamp="10:00 AM" pic="url_to_pic" />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should display the correct text and timestamp', () => {
        render(<ChatBubble sender="John" text="Hello" isSent={false} timestamp="10:00 AM" pic="url_to_pic" />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });

    it('should display the profile picture on the left for received messages', () => {
        render(<ChatBubble sender="John" text="Hello" isSent={false} timestamp="10:00 AM" pic="url_to_pic" />);
    });

    it('should display the profile picture on the right for sent messages', () => {
        render(<ChatBubble sender="John" text="Hello" isSent={true} timestamp="10:00 AM" pic="url_to_pic" />);
    });

    it('should match the snapshot', () => {
        const { asFragment } = render(<ChatBubble sender="John" text="Hello" isSent={true} timestamp="10:00 AM" pic="url_to_pic" />);
        expect(asFragment()).toMatchSnapshot();
    });

});