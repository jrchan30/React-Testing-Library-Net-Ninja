import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Todo from '../Todo';

const MockTodo = () => (
  <BrowserRouter>
    <Todo />
  </BrowserRouter>
);

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, {
      target: { value: task },
    });
    fireEvent.click(buttonElement);
  });
};

describe('Todo', () => {
  it('should render same text passed into title prop', async () => {
    render(<MockTodo />);
    addTask(['Go Grocery Shopping']);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it('should render multiple elements', async () => {
    render(<MockTodo />);
    addTask(['Go Grocery Shopping', 'Pet my Cat', 'Wash my Hands']);
    const divElement = screen.getAllByTestId('task-container');
    expect(divElement.length).toBe(3);
  });

  it('should not have completed class when initially rendered', async () => {
    render(<MockTodo />);
    addTask(['Go Grocery Shopping']);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass('todo-item-active');
  });

  it('should not have completed class when clicked', async () => {
    render(<MockTodo />);
    addTask(['Go Grocery Shopping']);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass('todo-item-active');
  });
});
