# Stage 1: Build React application
FROM node:18 AS react-build
WORKDIR /app
COPY ReactApp/package*.json ./
RUN npm install
COPY ReactApp/ ./
RUN npm list webpack || npm install --save-dev webpack webpack-cli
RUN npx webpack --mode development

# Stage 2: Build .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["App.csproj", "./"]
RUN dotnet restore "./App.csproj"
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=react-build /app/dist ./wwwroot
ENTRYPOINT ["dotnet", "App.dll"]
