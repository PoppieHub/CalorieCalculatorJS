import {productList, productListShow} from '../variables.js';

let showProductList = false;

// Переключение видимости списка продуктов
export default function toggleProductListVisibility() {
    showProductList = !showProductList;
    // Изменение стиля отображения списка продуктов (Виден/ отключен)
    productList.style.display = showProductList ? 'none' : 'grid';
    // Изменение текста кнопки переключения видимости
    productListShow.textContent = showProductList ? 'Показать список продуктов' : 'Скрыть список продуктов';
}