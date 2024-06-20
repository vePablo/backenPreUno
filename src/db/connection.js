import mongoose from 'mongoose'

const connectString = 'mongodb+srv://admin:admin@cluster0.8vk9hbt.mongodb.net/testFinal1?retryWrites=true&w=majority&appName=Cluster0'

const initMongoDB = async () => {
    try {
        await mongoose.connect(connectString)
        console.log("Conectado a la basee de datos")
    } catch (error) {
        console.log(error)
    }
}

initMongoDB()