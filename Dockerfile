# Sử dụng image node phiên bản 14
FROM node:18 as build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm i

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng image nginx
FROM nginx:1.24.0

# Sao chép tệp build của React vào thư mục mặc định của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Cổng mặc định cho Nginx
EXPOSE 80

# Khởi động Nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]