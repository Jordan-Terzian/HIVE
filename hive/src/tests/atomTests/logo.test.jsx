import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "../../components/atoms/logo";

test("renders without crashing", () => {
    render(<Logo />);
});

test("has correct image source", () => {
    render(<Logo />);
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toHaveAttribute("src", "/assets/images/Logo.png");
});

test("has correct alt text", () => {
    render(<Logo />);
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toHaveAttribute("alt", "Logo");
});

test("has correct styling", () => {
    render(<Logo />);
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toHaveStyle({ height: '100px' });
});

