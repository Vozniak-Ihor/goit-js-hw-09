const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleFormElSubmit);

async function handleFormElSubmit(event) {
  event.preventDefault();
  const inputDelayValue = Number(event.target.elements.delay.value);
  const inputStepValue = Number(event.target.elements.step.value);
  const inputAmountValue = Number(event.target.elements.amount.value);

  for (let i = 1; i <= inputAmountValue; i += 1) {
    let currentDelay = inputDelayValue + (i - 1) * inputStepValue;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        window.alert(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        window.alert(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
