const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const fs = require("fs");
const studentRoutes = require('./routes/studentsWithMongoose');

const app = express();

// 1. إعدادات قاعدة البيانات (MongoDB Atlas)
const url = "mongodb+srv://AhmedKh:mongo@cluster0.xrny0xe.mongodb.net/Maqraaty";

// 2. Middlewares
app.use(bodyparser.json());
app.use(cors());

// 3. إدارة الملفات المرفوعة (Uploads)
const folderPath1 = path.join(__dirname, "uploads");
if (!fs.existsSync(folderPath1)) {
    fs.mkdirSync(folderPath1, { recursive: true });
}
app.use('/uploads', express.static('uploads'));

// 4. تقديم ملفات الأنجولار (CSR Build)
// تأكد أن المسار يطابق مجلد الـ build الفعلي لديك
const distPath = path.join(__dirname, "dist/maqraaty_2/browser");
app.use(express.static(distPath));

// 5. مسارات الـ API
app.use("/api", studentRoutes);

// 6. توجيه كافة الطلبات الأخرى لملف index.html (Angular Routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// 7. إعداد المنفذ والتشغيل (مهم جداً للـ Deployment)
const PORT = process.env.PORT || 8080; // سيستخدم المنفذ المتاح على السيرفر أو 8080 محلياً

const startServer = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB Atlas Successfully");
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

startServer();