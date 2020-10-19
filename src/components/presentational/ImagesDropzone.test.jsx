import React from 'react';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import ImagesDropzone from './ImagesDropzone';

describe('ImagesDropzone', () => {
  const handleOnDrop = jest.fn();

  async function flushPromises(rerender, ui) {
    await act(() => waitFor(() => rerender(ui)));
  }

  function dispatchEvt(node, type, data) {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, data);
    fireEvent.drop(node, event);
  }

  function mockData(files) {
    return {
      dataTransfer: {
        files,
        items: files.map((file) => ({
          kind: 'file',
          type: file.type,
          getAsFile: () => file,
        })),
        types: ['Files'],
      },
    };
  }

  beforeEach(() => {
    handleOnDrop.mockClear();
  });

  it('invoke onDragEnter when dragenter event occurs', async () => {
    const file = new File([
      JSON.stringify({ ping: true }),
    ], 'ping.json', { type: 'application/json' });
    const data = mockData([file]);

    const ui = (
      <ImagesDropzone
        onDrop={handleOnDrop}
      />
    );

    const { container, rerender } = render(ui);

    const dropzone = container.querySelector('div');

    dispatchEvt(dropzone, 'dragenter', data);
    await flushPromises(rerender, ui);

    expect(handleOnDrop).toHaveBeenCalled();
  });
});
