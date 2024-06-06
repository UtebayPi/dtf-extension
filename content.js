const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
/* Отключение кнопки выбора дополнительных реакций */
	div.reaction-button:has(svg) {
		display: none;
	}

	/* Совмещение и выравнивание ряда кнопок */
	.content--short .content__reactions {
		padding-left: 24px !important;
		padding-right: 0;
		align-self: center;
		padding-bottom: 0;
		padding-top: 0;
	}
	.content--short .content-footer {
		padding-left: 12px;
	}

	/* Интерпретация блока поста в ленте как grid; перераспределение контента */
	.content--short {
		display: grid;
		grid-template-rows: auto auto auto auto;
		grid-template-columns: auto 1fr;
	}
	.content--short > div:nth-child(1) {
		grid-column: span 2;
	}
	.content--short > div:nth-child(2) {
		grid-column: span 2;
	}
	.content--short > div:nth-child(3) {
		grid-column: span 1;
	}
	.content--short > div:nth-child(4) {
		grid-column: span 1;
	}

	/* Отключение отступа и подложки кнопок */
	div.reaction-button:has(img),
	div.reaction-button:has(img):hover {
		padding: 0 !important;
		background: none !important;
	}

	/* Эффект прозрачности, цвета и красного цвета при наведении */
	div.reaction-button:has(img):hover::before {
		filter: opacity(.6);
		/* 	color: crimson; */
		transition-duration: .2s;
	}

	/* Внешний вид не нажатой кнопки лайка */
	div.reaction-button:has(img)::before {
		content: '♡';
		color: var(--theme-color-text-secondary);
		margin-left: 1px;
		font-size: 20px;
		font-weight: bold;
		transition-duration: 0s;
	}

	/* Цвет количества лайков */
	div.reaction-button:has(img) span {
		color: var(--theme-color-text-secondary);
	}

	/* Внешний вид нажатой кнопки лайка */
	div.reaction-button--active:has(img)::before {
		content: '❤️';
		margin-left: 1px;
		font-size: 20px;
		color: crimson;
		transition-duration: 0s;
	}

	/* Отключение оригинальной иконки лайка (щас бы раст в 2к24 использовать в качестве иконок, ага) */
	div.reaction-button img {
		display: none;
	}

	/* Отключение дополнительных кнопок "кастомных" лайков по признаку атрибута src */
	.reaction-button:not(:has(img[src="data:image/png;base64,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"])) {
		display: none;
	}
	/* div.reactions:has(.reaction-button):has(img) > div.reaction-button:not(:first-child) {
	display: none;
    } */
	.popover-overlay:has(.reaction-plus-restriction) {
		display: none;
	}
`
document.head.appendChild(style);
