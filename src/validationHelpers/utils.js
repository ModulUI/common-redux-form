const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9-])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const validEmail = email => {
	if ((email || '').length == 0)
		return true;
	return EMAIL_REGEXP.test(email);
};

export const onlyCyr = string => {
	return /^[а-яА-ЯёЁ\-\s]*$/.test(string);
};

export const firstSymbolCyr = str => {
	if (str && str.length >= 1)
		return /^[а-яА-ЯёЁ]$/.test(str.charAt(0));
	return true;
};

export const validPassword = password => {
	return !isEmpty(password) && /^[A-Za-z0-9!"№%:;@#$%^&*(){}?_+=<>\~`§.\[\],\\\/|]+$/g.test(password); //должны быть буквы и цифры, заглавные и маленькие
};

export const validPasswordLength = password => {
	return !isEmpty(password) && password.length >= 8;
};

export const isEmpty = val => {
	return val === '' || val === null || val === undefined;
};

export const isRequired = text => val => isEmpty(val) ? text : undefined;

export const isValidNumber = val => {
	if (isEmpty(val))
		return true;
	return /^(0(\.|,)\d+|[1-9]+[0-9]*((\.|,)\d+)?|0)$/.test(+val);
};

// мин длинна
export const validateMinLength = (count, text) => (val) => val.length < count ? text : undefined;

export const isZeroNumberFloat = val => {
	if (isEmpty(val))
		return true;
	return /^\d[0-9]*[.|,]{0,1}[0-9]+$/g.test(val);	// любые цифры с точкой или запятой в середине
};

const CELLPHONE_REGEXP = /^[0-9]{10}$/;
export const getPlainNumber = value => {
	const tempNumber = value.replace ? value : value.toString();
	return tempNumber.replace(/[^0-9]+/g, '').substring(0, 10);
};

export const isValidPhone = phone => {
	if (isEmpty(phone))
		return true;
	phone = getPlainNumber(phone);
	if (phone.length <= 10)
		return CELLPHONE_REGEXP.test(phone);
	return false;
};

export const validator = (errorText, validateCondition) => (...props) => {
	return !validateCondition(...props) ? errorText : undefined;
};


export const getOnlyNumber = (value, count) => {
	const tempNumber = value.replace ? value : value.toString();
	return tempNumber.replace(/[^0-9]+/g, '').substring(0, count || 10);
};

// убирает пробелы вначале и в конце
export const normilizeDelFirstEndSpace = val => val.replace(/(^\s*)|(\s*)$/g, '');

// латинские буквы, числа + не чувствителен к регистру
export const validatorLatinNumber = value => /^[а-яa-z0-9._-]+$/gi.test(value);

// только латинские буквы, числа + не чувствителен к регистру
export const validatorOnlyLatinNumber = value => /^[a-z0-9]+$/gi.test(value);

// normalize, только лат. буквы, цифры
export const normalizeOnlyLatinNumber = (value) => {
	if (value.replace) {
		return value.replace(/[^a-z0-9]/gi, "");
	}
	return '';
};

// только латинские буквы, числа, спецсимволы + не чувствителен к регистру
export const validatorOnlyLatinNumberSymb = value => /^([\-?:\"`'().,‘+a-z0-9 '])*$/gi.test(value);

// normalize, не даёт ввести кириллицу, можно спец-символы
export const normalizeOnlyLatinNumberSymb = (value) => {
	if (value.replace) {
		return value.replace(/[^\-?:\"`'().,‘+a-z0-9 ']/gi, "");
	}
	return '';
};

// normalize, только цифры
export const normalizeOnlyNumber = (value) => {
	if (value && value.replace) {
		return value.replace(/[^0-9]/gi, "");
	}
	return '';
};

