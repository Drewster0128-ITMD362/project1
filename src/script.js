//html elements
const form = document.querySelector('form');
const formFields = document.querySelectorAll('.form-field');

//console.log(formInputs);

//event functions
function validateSubmission(event)
{
    event.preventDefault()
    //check criteria
    formFields.forEach((formField) => hasInput(formField))
    //valid first name
    //valid last name
    //valid email
}

function validEmail(formField)
{
    let formInput = formField.querySelector('.form-field__input');
    if(!formInput.checkValidity() && !formField.classList.contains('form-field--invalid-email'))
    {
        formField.classList.add('form-field--invalid-email');
    }
    else if(formInput.checkValidity() && formField.classList.contains('form-field--invalid-email'))
    {
        formField.classList.remove('form-field--invalid-email');
    }
}

function hasInput(formField)
{
    let formInput = formField.querySelector('.form-field__input');
    if(formInput.value === '' && !formField.classList.contains('form-field--invalid'))
    {
        formField.classList.add('form-field--invalid');
    }
    else if(formInput.value !== '' && formField.classList.contains('form-field--invalid'))
    {
        //add red border
        formField.classList.remove('form-field--invalid');
    }
}

function formFieldOnFocusIn(formField)
{
    if(formField.classList.contains('form-field--invalid'))
    {
        formField.classList.remove('form-field--invalid');
    }
}

function validateInput(formField)
{
    let formInput = formField.querySelector('.form-field__input');
    if(formInput.type === 'email')
    {
        validEmail(formField);
    }
    hasInput(formField);
}

//event listeners
form.addEventListener('submit', validateSubmission);

formFields.forEach((formField) => {
    formField.addEventListener('focusin', (event) => {
        formFieldOnFocusIn(formField);
    })
    formField.addEventListener('focusout', (event) => {
        validateInput(formField);
    }) 
})