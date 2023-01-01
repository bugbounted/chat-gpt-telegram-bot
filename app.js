import telegramBot from 'node-telegram-bot-api'
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const token = process.env.BOT_TOKEN

const bot = new telegramBot(token, { polling: true })
bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
   if(message === '/start') {
    const initialMessage = 'Welcome to Chat GPT Bot\n\n Ask any question.'
    bot.sendMessage(chatId, initialMessage)
   } 
   else sendToChatGPT(message, chatId)

})

const sendToChatGPT = async (message, chatId) => {
    
    const sendToChatGPT = await openai.createCompletion({
        "model": "text-davinci-002",
        "prompt": message,
        "max_tokens": 1000,
        "temperature": 0,
        "echo": true
    })
    const response = sendToChatGPT.data.choices[0].text

    bot.sendMessage(chatId, response)
}

