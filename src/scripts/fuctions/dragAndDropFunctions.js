import {addToSelectedProducts, getProductById} from "./ProductManager.js";
import {displaySelectedProducts} from "./displayFunctions.js";

// Позволяет браузеру обрабатывать событие перетаскивания
export const allowDrop = (e) => {
    e.preventDefault();
};

// Обработка события "drop" при перетаскивании продукта
export const handleDrop = (e) => {
    e.preventDefault();
    // Получение id продукта из перетаскиваемых данных
    const productId = e.dataTransfer.getData('text/plain');
    // Получение продукта по id и добавление его к выбранным продуктам
    const product = getProductById(productId);

    if (product) {
        addToSelectedProducts(product);
        // Обновление отображения выбранных продуктов
        displaySelectedProducts();
    }
};

// Обработка события при начале перетаскивания продукта
export const handleDragStart = (e, productId) => {
    // Установка id для перетаскивания
    e.dataTransfer.setData('text/plain', productId);
};