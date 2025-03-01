# Stage 1: Build React frontend
FROM node:18 AS frontend
WORKDIR /app/ReactApp

# Copy package.json trước để cache dependencies
COPY ReactApp/package*.json ./

# Cài đặt dependencies
RUN npm install

# Chạy Webpack build (sửa lỗi Permission Denied)
RUN chmod +x node_modules/.bin/webpack && npx webpack --mode development

# Copy toàn bộ source code của ReactApp
COPY ReactApp/ /app/ReactApp/

# Build React app
RUN npx webpack --mode production

# Stage 2: Build .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy toàn bộ source code
COPY . .

# Restore và publish ứng dụng
RUN dotnet restore "App.csproj"
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Run .NET app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy từ stage build
COPY --from=build /app/publish .

# Copy React build vào wwwroot (sửa lỗi alias `react-build`)
COPY --from=frontend /app/ReactApp/dist ./wwwroot

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "App.dll"]
