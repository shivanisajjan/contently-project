FROM openjdk:11
ADD ./target/demo-0.0.1-SNAPSHOT.jar /usr/src/demo-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "demo-0.0.1-SNAPSHOT.jar"]
