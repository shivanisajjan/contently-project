FROM openjdk:11
ADD ./target/publication-service-0.0.1-SNAPSHOT.jar /usr/src/publication-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "publication-service-0.0.1-SNAPSHOT.jar"]
