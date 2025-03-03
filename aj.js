require('dotenv').config();
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// 📌 Готовое расписание
const schedule = {
    monday: "📅 Понедельник:\n13:00 - Veb ilovalar yaratish - 115\n14:30 - Amaliy dasturiy paketlar - 106\n16:00 -  Veb ilovalar yaratish",
    tuesday: "📅 Вторник:\n10:00 - История\n13:00 - Химия\n15:00 - Английский",
    wednesday: "📅 Среда:\n08:00 - Геометрия\n10:00 - Биология\n12:00 - Литература",
    thursday: "📅 Четверг:\n09:00 - Физкультура\n11:00 - Философия\n14:00 - Экономика",
    friday: "📅 Пятница:\n10:00 - Информатика\n12:00 - Труд\n15:00 - Социология",
    saturday: "📅 Суббота:\nВыходной! 🎉",
    sunday: "📅 Воскресенье:\nВыходной! 🎉"
};

// 📌 Функция для получения завтрашнего дня
function getTomorrowSchedule() {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date().getDay();
    const tomorrow = days[(today + 1) % 7];
    return schedule[tomorrow];
}

// 📌 Команда для получения расписания на завтра
bot.command('tomorrow', async (ctx) => {
    await ctx.reply(getTomorrowSchedule());
});

// 📌 Команда для получения расписания на всю неделю
bot.command('week', async (ctx) => {
    let weekSchedule = Object.values(schedule).join("\n\n");
    await ctx.reply(weekSchedule);
});

// 📌 Запуск бота
bot.launch().then(() => console.log('✅ Бот запущен!'));
