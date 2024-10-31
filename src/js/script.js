class FormField
{
  constructor(formField)
  {
    this.formField = formField;
    this.formField.classList.add('form-field--valid');
  }

  getInput()
  {
    return this.formField.querySelector('.form-field__input');
  }

  getType()
  {
    return this.getInput().type;
  }

  //0 for valid
  //1 for empty
  //2 for non-email input
  //3 for unchecked
  isValid()
  {
    let formInput = this.getInput();
    if(this.getType() === 'email')
    {
      //for valid email, checkValidity() must be true and input cannot be empty
      if(formInput.value !== '' && formInput.checkValidity())
      {
        return 0;
      }
      else if(formInput.value === '')
      {
        return 1;
      }
      else
      {
        return 2;
      }
    }
    else if(this.getType() === 'checkbox')
    {
      if(formInput.checked)
      {
        return 0;
      }
      else
      {
        return 3;
      }
    }
    else
    {
      if(formInput.value !== '')
      {
        return 0;
      }
      else
      {
        return 1;
      }
    }
  }

  getState()
  {
    return this.formField.classList[this.formField.classList.length -1];
  }

  setState(newState)
  {
    this.formField.classList.replace(this.getState(), newState);
  }

  //.form-field--valid
  //.form-field--invalid-empty
  //.form-field--invalid-email
  //.form-field--invalid-checkbox
  updateState()
  {
    //remove current state from class list
    if(this.isValid() === 0)
    {
      this.setState('form-field--valid');
    }
    else if(this.isValid() === 1)
    {
      this.setState('form-field--invalid-empty');
    }
    else if(this.isValid() === 2)
    {
      this.setState('form-field--invalid-email');
    }
    else
    {
      this.setState('form-field--invalid-checkbox');
    }
  }
}

const form = document.querySelector('form');
const formButton = document.querySelector('#submit-button');
const formFields = document.querySelectorAll('.form-field')
const formFieldObjs = []

formFields.forEach((formField) => {
  let formFieldObj = new FormField(formField)
  formFieldObj.formField.addEventListener('focusin', (event) => {
    formFieldObj.setState('form-field--valid');
  });
  formFieldObj.formField.addEventListener('focusout', (event) => {
    formFieldObj.updateState();
  });
  formFieldObjs.push(formFieldObj);
});

formButton.addEventListener('click', (event) => {
  event.preventDefault();
  let valid = true;
  formFieldObjs.forEach((formFieldObj) => {
    valid = valid && (formFieldObj.isValid() === 0);
  });
  if(valid)
  {
    window.location.href = 'submit/';
  }
  else
  {
    formFieldObjs.forEach((formFieldObj) => {
      formFieldObj.updateState();
    });
  }
});