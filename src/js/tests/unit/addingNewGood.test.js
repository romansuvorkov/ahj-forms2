import Cart from '../../Cart';

jest.mock('../../changeVisability');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Adding new item', () => {
  const cart = new Cart();
  cart.nameInput = document.createElement('input');
  cart.priceInput = document.createElement('input');
  cart.goodContainer = document.createElement('div');
  cart.nameInput.value = 'Test';
  cart.priceInput.value = '123';
  cart.createItem();
  const expected = [{
    name: 'Test',
    price: 123,
    id: 0,
  }];

  expect(cart.goods).toEqual(expected);
});
