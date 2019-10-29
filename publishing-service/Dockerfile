FROM openjdk:11
ADD ./target/publishing-service-0.0.1-SNAPSHOT.jar /usr/src/publishing-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "publishing-service-0.0.1-SNAPSHOT.jar"]
