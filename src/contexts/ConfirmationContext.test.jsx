// import React from 'react';

// import { fireEvent, render, waitFor } from '@testing-library/react';

// import { useDispatch, useSelector } from 'react-redux';

// import ConfirmationContext from './ConfirmationContext';

// import LoggedInUserSellProductsContainer from '../components/container/LoggedInUserSellProductsContainer';

// import loggedInUserSellProducts from '../../fixtures/loggedInUserSellProducts';
// import ConfirmDialog from '../components/presentational/ConfirmDialog';

// jest.mock('react-redux');
// describe('ConfirmationContext', () => {
//   const dispatch = jest.fn();

//   const showConfirmation = jest.fn();
//   const setConfirmForm = jest.fn();

//   beforeEach(() => {
//     useDispatch.mockImplementation(() => dispatch);
//     useSelector.mockImplementation((selector) => selector({
//       productReducer: {
//         loggedInUserSellProducts,
//       },
//     }));
//   });

//   it('test', async () => {
//     setConfirmForm.mockImplementation(() => ({
//       title: '삭제하시겠습니까?',
//       content: '삭제하면 되돌릴 수 없습니다.',
//     }));
//     showConfirmation.mockImplementation(() => Promise.resolve(true));

//     const { container, getAllByText } = render((
//       <ConfirmationContext.Provider
//         value={{
//           showConfirmation,
//           setConfirmForm,
//         }}
//       >
//         <LoggedInUserSellProductsContainer />
//         <ConfirmDialog
//           isOpen
//           title="삭제하시겠습니까?"
//           content="삭제하면 되돌릴 수 없습니다."
//           onConfirm={jest.fn()}
//           onCancel={jest.fn()}
//         />
//       </ConfirmationContext.Provider>
//     ));

//     const deleteButtons = getAllByText('Delete');

//     fireEvent.click(deleteButtons[0]);

//     await waitFor(() => expect(showConfirmation).toBeCalled());
//   });
// });
