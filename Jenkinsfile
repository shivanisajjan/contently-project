pipeline {

    agent any

​

    environment {

        repo_path = 'contently'

    }

​

    stages {

        stage('sync source code') {

            when{ branch 'master' }

            steps {

                sh "rsync -rva contently ubuntu@13.126.150.171:/home/ubuntu/"

            }

        }

        stage('build') {

            when { branch 'master' }

            steps {

                sh "ssh ubuntu@13.126.150.171 'cd ~/'contently' ; mvn clean package -DskipTests'"
                sh "ssh ubuntu@13.126.150.171 'cd ~/'${repo_path}'/frontend ; npm install'"
                sh "ssh ubuntu@13.126.150.171 'cd ~/'${repo_path}'/frontend ; ng build'"
            }

        }

        stage('Deploy') {

            when { branch 'master' }

            steps {

                sh "ssh ubuntu@13.126.150.171 'cd ~/'contently' ; docker-compose up --build -d"

            }

        }

        stage('Deployment status') {

            when { branch 'master' }

            steps {

                sh "ssh ubuntu@13.126.150.171 'cd ~/'contently' ; sleep 30 ; docker ps'"

            }

        }

    }
