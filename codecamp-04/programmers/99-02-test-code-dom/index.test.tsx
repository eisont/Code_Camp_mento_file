import { cleanup, render, fireEvent } from "@testing-library/react";
import TestCodeDomPage from ".";

test("페이지 테스트", () => {
    const { queryByLabelText, getByLabelText } = render(<TestCodeDomPage />);
    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));
    expect(queryByLabelText(/on/i)).toBeTruthy();
});
