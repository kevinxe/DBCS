# Fase de construcción
FROM maven:3-openjdk-17 AS MAVEN_BUILD

ARG MODULE_NAME

WORKDIR /build

# Primero, copia solo los archivos POM y resuelve las dependencias
COPY pom.xml /build
COPY common-library/pom.xml /build/common-library/
COPY user-api/pom.xml /build/user-api/
COPY vehicle-api/pom.xml /build/vehicle-api/
COPY chargingpoint-api/pom.xml /build/chargingpoint-api/
COPY recharge-api/pom.xml /build/recharge-api/
RUN mvn dependency:go-offline

# Ahora copia el resto del código
COPY common-library /build/common-library
COPY user-api /build/user-api
COPY vehicle-api /build/vehicle-api
COPY chargingpoint-api /build/chargingpoint-api
COPY recharge-api /build/recharge-api

# Construye solo el módulo deseado y la librería común
RUN mvn -pl common-library,${MODULE_NAME} clean package -DskipTests

# Fase de ejecución
FROM openjdk:17

ARG MODULE_NAME

WORKDIR /app

# Copia solo el JAR necesario
COPY --from=MAVEN_BUILD /build/${MODULE_NAME}/target/*.jar app.jar

# Define el punto de entrada para iniciar la aplicación
ENTRYPOINT ["java","-jar","/app/app.jar"]

