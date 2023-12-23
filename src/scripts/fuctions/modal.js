import {
    modal,
    goalsModal
} from '../variables.js';

// Открытие модального окна
export const openModal = () => {
    modal.style.display = 'block';
};

// Закрытие модального окна
export const closeModal = () => {
    modal.style.display = 'none';
};

// Открытие модального окна для целевых калорий
export const openGoalsModal = () => {
    goalsModal.style.display = 'block';
};

// Закрытие модального окна для целевых калорий
export const closeGoalsModal = () => {
    goalsModal.style.display = 'none';
};

// Отображение предупреждающего модального окна
export const showWarningModal = () => {
    // Создание контейнера модального окна
    const modalContainer = document.createElement('div');
    modalContainer.className = 'warning-modal';

    // Создание элементов модального окна
    const modalContent = document.createElement('div');
    modalContent.className = 'warning-modal-content';
    modalContent.innerHTML = `<span>Превышен дневной лимит калорий!</span>`;

    // Создание кнопки закрытия модального окна
    const closeButton = document.createElement('button');
    closeButton.innerHTML = `&times`;
    closeButton.className = 'close';
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });

    // Добавление кнопки закрытия в содержимое модального окна
    modalContent.appendChild(closeButton);
    // Добавление содержимого модального окна в контейнер
    modalContainer.appendChild(modalContent);

    // Добавление контейнера модального окна в body документа
    document.body.appendChild(modalContainer);
};