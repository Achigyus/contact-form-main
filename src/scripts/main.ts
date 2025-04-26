import '../sass/index.sass'

const form = document.querySelector('.contact_form') as HTMLFormElement | null;
const successMsgDiv = document.querySelector('.success_message') as HTMLDivElement | null;
let submit = false

if (form) {
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', handleFormInput);
}

function handleSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData(form!);
  const isValid = validateFormData(formData);
  submit = true
  if (isValid && successMsgDiv) {
    form!.reset();
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    })
    form?.focus()
    successMsgDiv.classList.add('active');
    setTimeout(() => successMsgDiv.classList.remove('active'), 3000);
    submit = false
  }
}

function handleFormInput() {
  const formData = new FormData(form!);
  if (submit) {
    validateFormData(formData);
  }
}

function validateFormData(data: FormData): boolean {
  const fields = {
    first_name: data.get('firstname') as string,
    last_name: data.get('lastname') as string,
    email: data.get('email') as string,
    message: data.get('message') as string,
    consent: data.get('consent') as string,
    query_type: data.get('querytype') as string,
  };

  let valid = true;

  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      displayError(key, true, key === 'email' ? 'This field is required' : '');
      valid = false;
    } else {
      if (key === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        displayError('email', true, 'Please enter a valid email address');
        valid = false;
      } else {
        displayError(key, false);
      }
    }
  }

  return valid;
}

function displayError(name: string, show: boolean, message = '') {
  const errorP = document.querySelector(`.error_${name}`) as HTMLParagraphElement | null;
  if (!errorP) return;
  errorP.classList.toggle('active', show);
  if (message) errorP.textContent = message;
}
