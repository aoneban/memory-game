let modalNumber = 0;
let activeModal = null;

export function createModal({ title, createContent, actions = [] }) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');

  const panel = document.createElement('div');
  panel.classList.add('modal-panel');

  const heading = document.createElement('h2');
  heading.id = `modal-title-${++modalNumber}`;
  heading.textContent = title;
  dialog.setAttribute('aria-labelledby', heading.id);

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const buttons = document.createElement('div');
  buttons.classList.add('modal-actions');

  const close = () => {
    if (dialog.open) {
      dialog.close();
    }
    if (activeModal?.dialog === dialog) {
      activeModal = null;
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  };

  [...actions, { label: 'Close' }].forEach(({ label, onClick }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn');
    button.textContent = label;
    button.addEventListener('click', () => {
      close();
      onClick?.();
    });
    buttons.append(button);
  });

  let backdropPressed = false;
  const isBackdrop = (event) => {
    const bounds = dialog.getBoundingClientRect();
    return (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    );
  };
  dialog.addEventListener('pointerdown', (event) => {
    backdropPressed = isBackdrop(event);
  });
  dialog.addEventListener('click', (event) => {
    if (backdropPressed && isBackdrop(event)) {
      close();
    }
    backdropPressed = false;
  });
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('close', () => {
    if (!dialog.open) {
      close();
    }
  });

  panel.append(heading, content, buttons);
  dialog.append(panel);
  document.body.append(dialog);

  return {
    open(...args) {
      if (dialog.open) {
        return;
      }
      activeModal?.close();
      content.replaceChildren(createContent(...args));
      dialog.showModal();
      activeModal = { dialog, close };
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    },
    close,
  };
}
