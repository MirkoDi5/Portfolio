# syntax=docker/dockerfile:1

################################################################################
# 1. BUILD STAGE (Using JDK to compile the code)
################################################################################
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /build

# Copy Gradle executable and wrapper files
# This allows Docker to run gradle without you installing it inside the image
COPY gradlew .
COPY gradle/ gradle/

# Copy the configuration files
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src src/

# Build the application
# We use 'bootJar' to create the executable and '-x test' to skip failing tests
RUN ./gradlew bootJar -x test

################################################################################
# 2. RUNTIME STAGE (Using JRE to run the app - much smaller and more secure)
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

# Copy the JAR from the build stage
# Gradle puts the jar in /build/libs/ (not target/)
COPY --from=build /build/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]