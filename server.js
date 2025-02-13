const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let dayNumber = 34; // Начинаем с 34 и идём вниз
let nextUpdateTime = getRandomUpdateTime();

// 🔹 Список картинок с котиками (замени на свои Imgur-ссылки)
const catImages = [
"https://imgur.com/a/umtGeUA",
	"https://imgur.com/a/umtGeUA",
	"https://imgur.com/a/umtGeUA"
];

function getRandomUpdateTime() {
	const now = new Date();
	const updateHour = 18 + Math.floor(Math.random() * 2); // 18-20 вечера
	const updateMinute = Math.floor(Math.random() * 60);
	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), updateHour, updateMinute);
}

function updateDayIfNeeded() {
	const now = new Date();
	if (now >= nextUpdateTime && dayNumber > 0) {
		dayNumber--;
		nextUpdateTime = getRandomUpdateTime();
	}
}

app.get("/counter", (req, res) => {
	updateDayIfNeeded();
	res.json({
		day: dayNumber,
		catImage: catImages[dayNumber % catImages.length] // Меняем фото каждый день
	});
});

app.listen(3000, () => {
	console.log("Сервер запущен на http://localhost:3000");
});
