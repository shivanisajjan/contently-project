FROM adoptopenjdk/openjdk11-openj9:alpine-jre
ADD ./target/notification-0.0.1-SNAPSHOT.jar /usr/src/notification-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "notification-0.0.1-SNAPSHOT.jar"]