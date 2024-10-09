import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "", {
      // Xóa các tùy chọn đã không còn được hỗ trợ
      // Chỉ cần kết nối như dưới đây
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Connect Failed");
  }
};

export default connectDB;
