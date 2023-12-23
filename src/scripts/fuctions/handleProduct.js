import Product from "../classes/Product.js";
import {deleteProduct, saveProduct} from "./ProductManager.js";
import {productForm} from "../variables.js";
import {closeModal} from "./modal.js";
import {displayProducts} from "./displayFunctions.js";

// Обработчик отправки формы продукта
export const handleProductFormSubmit = (e) => {
    // Отмена стандартного поведения формы
    e.preventDefault();

    // Получение значений полей формы продукта
    const productName = document.querySelector('#productName').value;
    const calories = document.querySelector('#calories').value;
    const description = document.querySelector('#description').value;

    // Проверка на заполненность всех полей
    if (!productName || !calories || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Создание экземпляра продукта и сохранение в localStorage
    const product = new Product(productName, calories, description);
    saveProduct(product);

    // Сброс формы, закрытие модального окна и обновление отображения продуктов
    productForm.reset();
    closeModal();
    displayProducts();
};

// Обработчик для удаления из списка продуктов
export const handleProductListClick = (e) => {
    // Проверка, что клик произошел по кнопке удаления
    if (e.target.classList.contains('delete-btn')) {
        // Получение и удаление продукта по ID
        const productId = e.target.dataset.productId;
        deleteProduct(productId);
        // Обновление отображения продуктов
        displayProducts();
    }
};