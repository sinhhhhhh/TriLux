# Stage 1: Build React frontend
FROM node:18 AS frontend
WORKDIR /app/ReactApp

# Copy package.json trước để tối ưu cache
COPY ReactApp/package*.json ./

# Cài đặt dependencies và đảm bảo node_modules tồn tại
RUN npm install && mkdir -p node_modules && ls -la node_modules

# Copy toàn bộ source code của ReactApp
COPY ReactApp/ ./

# Kiểm tra lại node_modules trước khi chạy Webpack
RUN ls -la node_modules && npx webpack --mode production

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

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "App.dll"]
