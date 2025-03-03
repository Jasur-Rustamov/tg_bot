require("dotenv").config();
const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// 📌 Готовое расписание
const schedule = {
    monday: ["📅 Понедельник:", "115 - Veb ilovalar yaratish - Maruza - 13:00", "106 - Amaliy dasturiy paketlar - Amaliy - 14:30", "115 - Veb ilovalar yaratish - Maruza - 16:00"].join("\n"),

    tuesday: ["📅 Вторник:", "309 - Veb ilovalar yaratish - Amaliy - 13:00", "326 - Ma'lumotlar bazasi - Maruza - 14:30", "KM-1 - Kompyuter tarmoqlari - Amaliy - 16:00"].join("\n"),
    
    wednesday: ["📅 Среда:", "323 - Ma'lumotlar bazasi - Amaliy - 13:00", "333 - Veb ilovalar yaratish - Amaliy - 14:30", "212 A - Amaliy dasturiy paketlar - Maruza - 16:00"].join("\n"),
    
    thursday: ["📅 Четверг:", "331 -  Ehtimollik va statistika - Maruza - 13:00", "333 - Kompyuter tarmoqlari - Maruza - 14:30", "301 - Ehtimollik va statistika - Maruza - 16:00"].join("\n"),
    
    friday: ["📅 Пятница:", "223 - Ma'lumotlar bazasi - Maruza - 13:00", "333 - Kompyuter tarmoqlari - Amaliy - 14:30"].join("\n"),
};


// 📌 Функция для получения расписания на сегодня
function getTodaySchedule() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  return schedule[days[today]];
}

// 📌 Функция для получения завтрашнего дня
function getTomorrowSchedule() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  const tomorrow = days[(today + 1) % 7];
  return schedule[tomorrow];
}

// 📌 Команда для получения расписания на сегодня
bot.command("today", async (ctx) => {
  await ctx.reply(getTodaySchedule());
});

// 📌 Команда для получения расписания на завтра
bot.command("tomorrow", async (ctx) => {
  await ctx.reply(getTomorrowSchedule());
});

// 📌 Команда для получения расписания на всю неделю
bot.command("week", async (ctx) => {
  let weekSchedule = Object.values(schedule).join("\n\n");
  await ctx.reply(weekSchedule);
});

// 📌 Запуск бота
bot.launch().then(() => console.log("✅ Бот запущен!"));
