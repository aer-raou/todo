import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../TodoItem";

describe("TodoItem", () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  it("renders the title and checkbox", () => {
    render(
      <TodoItem
        id="1"
        title="Test todo"
        completed={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />,
    );

    expect(screen.getByText("Test todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked checkbox if completed", () => {
    render(
      <TodoItem
        id="1"
        title="Completed todo"
        completed={true}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />,
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onToggle when checkbox clicked", async () => {
    render(
      <TodoItem
        id="1"
        title="Toggle test"
        completed={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />,
    );

    await userEvent.click(screen.getByRole("checkbox"));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button clicked", async () => {
    render(
      <TodoItem
        id="1"
        title="Delete test"
        completed={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
