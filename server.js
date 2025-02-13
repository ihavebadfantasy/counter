const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use("/cats", express.static(path.join(__dirname, "cats"))); // Раздаём файлы из папки

let dayNumber = 34; // Начинаем с 34 и идём вниз
let nextUpdateTime = getRandomUpdateTime();

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
		catImage: `./cats/cat${dayNumber % 10 + 1}.jpg`, // Выбираем случайное фото из 10 вариантов
		nextUpdate: nextUpdateTime.toISOString()
	});
});

app.listen(3000, () => {
	console.log("Сервер запущен на http://localhost:3000");
});
