import changeVisability from './changeVisability';

export default class Cart {
  constructor() {
    this.addBtn = null;
    this.goodContainer = null;
    this.inputForm = null;
    this.nameInput = null;
    this.priceInput = null;
    this.saveBtn = null;
    this.resetBtn = null;
    this.goods = [];
    this.redactForm = null;
    this.nameRedact = null;
    this.priceRedact = null;
    this.saveBtnRedact = null;
    this.resetBtnRedact = null;
    this.nameTooltip = null;
    this.priceTooltip = null;
    this.nameRedactTooltip = null;
    this.priceRedactTooltip = null;
    this.counter = 0;
    this.redactingItem = null;
  }

  init() {
    const addBtn = document.querySelector('.add_button');
    const goodContainer = document.querySelector('.g_list_container');
    const inputForm = document.querySelector('.input_form');
    const nameTooltip = document.querySelector('.name_input_tooltip');
    const priceTooltip = document.querySelector('.price_input_tooltip');
    const nameRedactTooltip = document.querySelector('.name_redact_tooltip');
    const priceRedactTooltip = document.querySelector('.price_redact_tooltip');
    const nameInput = inputForm.querySelector('.name_input');
    const priceInput = inputForm.querySelector('.price_input');
    const saveBtn = document.getElementById('save');
    const resetBtn = document.getElementById('reset');
    const redactForm = document.querySelector('.redact_form');
    const nameRedact = redactForm.querySelector('.name_redact');
    const priceRedact = redactForm.querySelector('.price_redact');
    const saveBtnRedact = document.getElementById('save_redact');
    const resetBtnredact = document.getElementById('reset_redact');
    this.redactForm = redactForm;
    this.nameRedact = nameRedact;
    this.priceRedact = priceRedact;
    this.saveBtnRedact = saveBtnRedact;
    this.resetBtnRedact = resetBtnredact;
    this.nameInput = nameInput;
    this.priceInput = priceInput;
    this.saveBtn = saveBtn;
    this.resetBtn = resetBtn;
    this.addBtn = addBtn;
    this.goodContainer = goodContainer;
    this.inputForm = inputForm;
    this.nameTooltip = nameTooltip;
    this.priceTooltip = priceTooltip;
    this.nameRedactTooltip = nameRedactTooltip;
    this.priceRedactTooltip = priceRedactTooltip;

    this.addBtn.addEventListener('click', () => {
      this.openForm(this.inputForm);
    });
    this.saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.priceTooltip.classList.contains('if_flex')) {
        changeVisability(this.priceTooltip, 'if_flex', 'if_none');
      }
      if (this.nameTooltip.classList.contains('if_flex')) {
        changeVisability(this.nameTooltip, 'if_flex', 'if_none');
      }
      const price = Math.floor(parseInt(priceInput.value, 10));
      this.priceTooltip.style.top = `${this.priceInput.offsetTop + this.priceInput.offsetHeight + this.priceInput.offsetHeight / 4}px`;
      this.priceTooltip.style.left = `-${this.priceInput.offsetLeft - this.priceInput.offsetWidth / 2}px`;
      if (this.nameInput.value === '') {
        if (this.nameTooltip.classList.contains('if_none')) {
          changeVisability(this.nameTooltip, 'if_none', 'if_flex');
        }
        this.nameTooltip.style.top = `${this.nameInput.offsetTop + this.nameInput.offsetHeight + this.nameInput.offsetHeight / 4}px`;
        this.nameTooltip.style.left = `-${this.nameInput.offsetLeft - this.nameInput.offsetWidth / 2}px`;
        this.nameInput.focus();
      } else if (price <= 0) {
        if (this.priceTooltip.classList.contains('if_none')) {
          changeVisability(this.priceTooltip, 'if_none', 'if_flex');
        }
        this.priceInput.focus();
      } else if (this.priceInput.value === '') {
        this.priceInput.focus();
        if (this.priceTooltip.classList.contains('if_none')) {
          changeVisability(this.priceTooltip, 'if_none', 'if_flex');
        }
      // eslint-disable-next-line no-restricted-globals
      } else if (isNaN(price)) {
        this.priceInput.focus();
        if (this.priceTooltip.classList.contains('if_none')) {
          changeVisability(this.priceTooltip, 'if_none', 'if_flex');
        }
      } else {
        if (this.priceTooltip.classList.contains('if_flex')) {
          changeVisability(this.priceTooltip, 'if_flex', 'if_none');
        }
        if (this.nameTooltip.classList.contains('if_flex')) {
          changeVisability(this.nameTooltip, 'if_flex', 'if_none');
        }
        this.createItem();
      }
    });
    this.saveBtnRedact.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.priceRedactTooltip.classList.contains('if_flex')) {
        changeVisability(this.priceRedactTooltip, 'if_flex', 'if_none');
      }
      if (this.nameRedactTooltip.classList.contains('if_flex')) {
        changeVisability(this.nameRedactTooltip, 'if_flex', 'if_none');
      }
      const price = Math.floor(parseInt(this.priceRedact.value, 10));
      this.priceRedactTooltip.style.top = `${this.priceRedact.offsetTop + this.priceRedact.offsetHeight + this.priceRedact.offsetHeight / 4}px`;
      this.priceRedactTooltip.style.left = `-${this.priceRedact.offsetLeft - this.priceRedact.offsetWidth / 2}px`;
      if (this.nameRedact.value === '') {
        if (this.nameRedactTooltip.classList.contains('if_none')) {
          changeVisability(this.nameRedactTooltip, 'if_none', 'if_flex');
        }
        this.nameRedactTooltip.style.top = `${this.nameRedact.offsetTop + this.nameRedact.offsetHeight + this.nameRedact.offsetHeight / 4}px`;
        this.nameRedactTooltip.style.left = `-${this.nameRedact.offsetLeft - this.nameRedact.offsetWidth / 2}px`;
        this.nameRedact.focus();
      } else if (price <= 0) {
        if (this.priceRedactTooltip.classList.contains('if_none')) {
          changeVisability(this.priceRedactTooltip, 'if_none', 'if_flex');
        }
        this.priceRedact.focus();
      } else if (this.priceRedact.value === '') {
        this.priceRedact.focus();
        if (this.priceRedactTooltip.classList.contains('if_none')) {
          changeVisability(this.priceRedactTooltip, 'if_none', 'if_flex');
        }
        // eslint-disable-next-line no-restricted-globals
      } else if (isNaN(price)) {
        this.priceRedact.focus();
        if (this.priceRedactTooltip.classList.contains('if_none')) {
          changeVisability(this.priceRedactTooltip, 'if_none', 'if_flex');
        }
      } else {
        if (this.priceRedactTooltip.classList.contains('if_flex')) {
          changeVisability(this.priceRedactTooltip, 'if_flex', 'if_none');
        }
        if (this.nameRedactTooltip.classList.contains('if_flex')) {
          changeVisability(this.nameRedactTooltip, 'if_flex', 'if_none');
        }
        this.redactItem();
        this.closeForm(this.redactForm);
      }
    });
    this.resetBtn.addEventListener('click', () => {
      this.openForm(this.inputForm);
    });

    this.resetBtnRedact.addEventListener('click', () => {
      this.openForm(this.redactForm);
    });
  }


  openForm(form) {
    changeVisability(form, 'if_none', 'if_flex');
  }

  closeForm(form) {
    changeVisability(form, 'if_flex', 'if_none');
  }


  createItem() {
    const objName = this.nameInput.value;
    const objPrice = Math.floor(parseInt(this.priceInput.value, 10));
    const newItem = {
      name: objName,
      price: objPrice,
      id: this.counter,
    };
    this.counter += 1;
    this.goods.push(newItem);
    this.clearList();
    this.redrawList();
    this.closeForm(this.inputForm);
    this.nameInput.value = '';
    this.priceInput.value = '';
  }


  clearList() {
    while (this.goodContainer.firstChild) {
      this.goodContainer.removeChild(this.goodContainer.firstChild);
    }
  }

  drawItem(inputObj, targetEl) {
    const item = document.createElement('div');
    item.classList.add('list_item');
    item.dataset.id = inputObj.id;
    item.innerHTML = `
        <span class="column name">${inputObj.name}</span>
        <span class="column price">${inputObj.price}</span>
        <div class="actions">
          <span class="redact"></span>
          <span class="delete">X</span>
        </div>
    `;
    targetEl.append(item);
    const itemRedactBtn = item.querySelector('.redact');
    const itemDeletetBtn = item.querySelector('.delete');
    itemRedactBtn.addEventListener('click', (event) => {
      this.openRedactForm(event.currentTarget.closest('.list_item'));
      this.openForm(this.redactForm);
    });
    itemDeletetBtn.addEventListener('click', (event) => {
      this.deleteItem(event.currentTarget.closest('.list_item'));
      this.clearList();
      this.redrawList();
    });
  }

  redrawList() {
    for (const item of this.goods) {
      this.drawItem(item, this.goodContainer);
    }
  }

  openRedactForm(input) {
    const goodsId = input.getAttribute('data-id');
    for (const item of this.goods) {
      if (item.id === parseInt(goodsId, 10)) {
        this.redactingItem = item;
      }
    }
    this.nameRedact.value = this.redactingItem.name;
    this.priceRedact.value = this.redactingItem.price;
  }

  deleteItem(input) {
    const goodsId = input.getAttribute('data-id');
    for (let i = 0; i < this.goods.length; i += 1) {
      if (parseInt(goodsId, 10) === this.goods[i].id) {
        this.goods.splice(i, 1);
      }
    }
  }

  redactItem() {
    this.redactingItem.name = this.nameRedact.value;
    this.redactingItem.price = this.priceRedact.value;
    this.clearList();
    this.redrawList();
  }
}
