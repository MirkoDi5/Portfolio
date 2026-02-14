# syntax=docker/dockerfile:1

################################################################################
# 1️⃣ BUILD STAGE (compile the Spring Boot app using Gradle)
################################################################################
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /build

# Copy Gradle wrapper and make it executable
COPY gradlew .
COPY gradle/ gradle/
RUN chmod +x gradlew

# Copy Gradle config
COPY build.gradle settings.gradle ./

# Copy source code
COPY src src/

# Build the application and skip tests
RUN ./gradlew bootJar -x test

################################################################################
# 2️⃣ RUNTIME STAGE (run the app using JRE for smaller image)
################################################################################
FROM eclipse-temurin:17-jre-jammy AS final

# Create a non-privileged user for security
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /build/build/libs/*.jar app.jar

# Expose the port your Spring Boot app will use
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
